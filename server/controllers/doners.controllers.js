const Doner = require("../models/doners.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET
const Address = require("../models/adresses.model")

module.exports = {
    countDoner : async (req, res) => {
      try {
        // Get the count of registered doners using the countDocuments() method
        const count = await Doner.countDocuments();
    
        res.json({ count });
      } catch (err) {
        console.error('Error fetching Doner count:', err);
        res.status(500).json({ error: 'Something went wrong' });
      }
    },
    readAllDoner: (req, res) => {
      Doner.find().populate()
      .then((allDoner) =>{
          res.json(allDoner)
      })
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      })
      },
    findOne : async (req, res) => {
      Doner.findOne({ _id: req.params.id }).populate('address')
          .then(oneSingleDoner => {
              res.json({ Doner: oneSingleDoner })
          })
          .catch((err) => {
              res.json({ message: 'Something went wrong', error: err })
          });
    },
    register: async (req, res) => {
        try {
            const newAddress = new Address(req.body.address); // Assuming the address fields are in the "address" property of req.body
            const thisDonerAddress = await newAddress.save();

            const donerData = {
              ...req.body,
              address: thisDonerAddress._id,
            };

            const doner = new Doner(donerData);
            const newDoner = await doner.save();
            
            console.log(newDoner);
            // Generate and send the JWT token
            const donerToken = jwt.sign({ id: newDoner._id }, SECRET);
            res.status(201).cookie("donerToken", donerToken, { httpOnly: true })
              .json({ message: "Registration successful", donerToken: donerToken, user: newDoner });
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
    },

    login: async (req, res) => {
        const donerFromDB = await Doner.findOne({email:req.body.email});
        if (!donerFromDB) {
            res.status(400).json({error: "Email does not exist"});            
        }else{
            try{
                const isPasswordValid = await bcrypt.compare(req.body.password, donerFromDB.password);
                if (isPasswordValid) {
                    const donerToken = jwt.sign({id: donerFromDB._id}, SECRET);
                    res.status(201)
                    .cookie("donerToken", donerToken, {httpOnly: true})
                    .json({message: "Logged in Successfuly", doner: donerFromDB, donerToken: donerToken})
                }else{
                    res.status(400).json({error: "Password is wrong"})
                }
            }catch(err){
                res.status(400).json({message: "Invalid credentials"})
            }
        }
    },

    logout: async (req, res) => {
        res.clearCookie('donerToken');
        res.json({message: "Doner logged out"});
    },

    getLoggedInDoner: async (req, res) =>{
    try {
        const doner = jwt.verify(req.cookies.donerToken, SECRET);
    
        // Find the doner using the ID from the token
        const loggedInDoner = await Doner.findOne({ _id: doner.id }).populate("address");

        if (!loggedInDoner) {
          // doner not found in the database
          return res.status(404).json({ error: 'Logged-in doner not found' });
        }
    
        // Send the doner data in the response
        res.json(loggedInDoner);
      } catch (err) {
        console.error('Error fetching logged-in doner:', err);

        // If there's an error with JWT verification or finding the doner, handle the error
        console.error('Error fetching logged-in doner:', err);
        res.status(401).json({ error: 'Invalid or expired token' });
      }
    }
};