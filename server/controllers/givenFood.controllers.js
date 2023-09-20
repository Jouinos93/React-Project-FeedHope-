const GivenFood = require("../models/givenFood.model")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET


module.exports = {

    successGiven : async (req, res) => {
        try {
          const givenSuccessfully = await GivenFood.find({ volunteerAble : req.params.id , status : "Picked Up"  }).populate('doner');
          res.json({ givenSuccessfully });
        } catch (err) {
          console.error('Error fetching givenFood done:', err);
          res.status(500).json({ error: 'Something went wrong' });
        }
    },

    countGivenFood : async (req, res) => {
        try {
          // Get the count of registered givenFood using the countDocuments() method
          const count = await GivenFood.count('qty');
      
          res.json({ count });
        } catch (err) {
          console.error('Error fetching givenFood count:', err);
          res.status(500).json({ error: 'Something went wrong' });
        }
    },
    // CREATE
    create : async (req, res) => {
        try {
            // Get the donor ID from the authenticated user (assuming it's available in req.user)
            const doner = jwt.verify(req.body.doner, SECRET);
            const donorId = doner.id; // Replace this with the actual path to get the donor ID
            // Create a new food donation request with the donor ID
            const newGivenFood = new GivenFood({
                title: req.body.title,
                type: req.body.type,
                qty: req.body.qty,
                canWait: req.body.canWait,
                toDeliverBefore: req.body.toDeliverBefore,
                doner: donorId, // Associate the donor ID with the donation request
            });
            // Save the donation request to the database
            const savedGivenFood = await newGivenFood.save();
            
            // If you want to populate the donor information in the response
            // Uncomment the following lines and make sure your GivenFood schema has a 'donor' field with type mongoose.Schema.Types.ObjectId and a ref to 'Doner' model.
            
            // const populatedGivenFood = await savedGivenFood.populate('donor').execPopulate();
            // res.status(201).json(populatedGivenFood);
            
            // Otherwise, just respond with the saved donation request
            res.status(201).json(savedGivenFood);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
      //READ ONE
      findOne : async (req, res) => {
          GivenFood.findOne({ _id: req.params.id }).populate('doner')
          .then(oneSingleGivenFood => {
              res.json({ GivenFood: oneSingleGivenFood })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
        },
        //READ ALL
        getAll: async (req, res) => {
            try {
              const allGivenFood = await GivenFood.find()
              .populate({
                path: 'doner',
                populate: {
                  path: 'address',
                  model: 'Address',
                },
              });
                
              res.json(allGivenFood);
            } catch (err) {
              res.json({ message: 'Something went wrong', error: err });
            }
          },

        // Get the given food for OneDonor
        getAllForDoner : async (req, res) => {
            // console.log("What i get from the front", req.params.id);
            GivenFood.find({doner : req.params.id}).populate('volunteerAble')
            .then((allGivenFoodForDoner) =>{
                res.json(allGivenFoodForDoner)
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            })
        },

        //Update
        push : async (req, res) =>{
            GivenFood.findOneAndUpdate({_id: req.params.id}, {$push: {GivenFood: req.body}},
                {new: true, runValidators: true})
                .then((updatedGivenFood)=>{
                    res.json({GivenFood: updatedGivenFood})
                })
                .catch((err) => {
                    res.status(400).json({ message: 'Something went wrong', error: err })
                });
            },

        //Delete
        delete : async (req, res) => {
            GivenFood.deleteOne({ _id: req.params.id })
                .then(result => {
                    res.json({ result: result })
                })
                .catch((err) => {
                    res.json({ message: 'Something went wrong', error: err })
                });
        },

        //Update Status
        pickup : async (req, res) => {
            try {
            const givenFoodId = req.params.fid;
                const updatedGivenFood = await GivenFood.findByIdAndUpdate(
                givenFoodId,
                {   volunteerAble: req.body.volunteerId,
                    status: "Promised" },
                { new: true } // Return the updated document
                );

                if (!updatedGivenFood) {
                return res.status(404).json({ error: 'Given food not found' });
                }

                res.json(updatedGivenFood);
                } catch (err) {
                    console.error('Error picking up donated food:', err);
                    res.status(500).json({ error: 'An error occurred' });
                }
        },
        pickedup : async (req, res) => {
            try {
            const givenFoodId = req.params.fid;
                const updatedGivenFood = await GivenFood.findByIdAndUpdate(
                givenFoodId,
                { status: "Picked Up" },
                { new: true } // Return the updated document
                );

                if (!updatedGivenFood) {
                return res.status(404).json({ error: 'Given food not found' });
                }

                res.json(updatedGivenFood);
                } catch (err) {
                    console.error('Error picking up donated food:', err);
                    res.status(500).json({ error: 'An error occurred' });
                }
        }

}