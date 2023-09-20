const Volunteer = require("../models/volunteers.model");
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET
const Address = require("../models/adresses.model")

module.exports = {
    countVolunteer : async (req, res) => {
        try {
          // Get the count of registered volunteers using the countDocuments() method
          const count = await Volunteer.countDocuments();
      
          res.json({ count });
        } catch (err) {
          console.error('Error fetching volunteer count:', err);
          res.status(500).json({ error: 'Something went wrong' });
        }
    },
    readAllVolunteer: (req, res) => {
        Volunteer.find().select('agencyName website phone email logo address')
        .then((allVolunteer) =>{
            res.json(allVolunteer)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
    },
    findOne : async (req, res) => {
        Volunteer.findOne({ _id: req.params.id }).populate('address')
            .then(oneSingleVolunteer => {
                res.json({ Volunteer: oneSingleVolunteer })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
    },

    register: async (req, res) => {
        try {
            console.log(req.body);

            // Create and save the address first
            const newAddress = new Address(req.body.address); // Assuming the address fields are in the "address" property of req.body
            const thisVolunteerAddress = await newAddress.save();
            
            console.log(thisVolunteerAddress._id);
            // Create the volunteer and set the address reference
            const volunteerData = {
              ...req.body,
              address: thisVolunteerAddress._id, // Associate the address with the volunteer
            };
            const volunteer = new Volunteer(volunteerData);
            const newVolunteer = await volunteer.save();
        
            // Generate and send the JWT token
            const volunteerToken = jwt.sign({ id: newVolunteer._id }, SECRET);
            res.status(201).cookie("volunteerToken", volunteerToken, { httpOnly: true })
              .json({ message: "Registration successful", volunteerToken: volunteerToken, user: newVolunteer });
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
    },

    login: async (req, res) => {
        const volunteerFromDB = await Volunteer.findOne({email:req.body.email});
        if (!volunteerFromDB) {
            res.status(400).json({error: "Email does not exist"});            
        }else{
            try{
                const isPasswordValid = await bcrypt.compare(req.body.password, volunteerFromDB.password);
                if (isPasswordValid) {
                    const volunteerToken = jwt.sign({id: volunteerFromDB._id}, SECRET);
                    res.status(201)
                    .cookie("volunteerToken", volunteerToken, {httpOnly: true})
                    .json({message: "Logged in Successfuly", volunteer: volunteerFromDB, volunteerToken: volunteerToken})
                }else{
                    res.status(400).json({error: "Password is wrong"})
                }
            }catch(err){
                res.status(400).json({message: "Invalid credentials"})
            }
        }
    },

    adminLogin: async (req, res) => {
        const volunteerFromDB = await Volunteer.findOne({email:req.body.email});
        if (!volunteerFromDB) {
            res.status(400).json({error: "Email does not exist"});            
        }else{
            try{
                const isPasswordValid = await bcrypt.compare(req.body.password, volunteerFromDB.password);
                if (isPasswordValid) {
                    if (volunteerFromDB.isAdmin) {
                        const volunteerToken = jwt.sign({id: volunteerFromDB._id}, SECRET);
                        res.status(201)
                        .cookie("volunteerToken", volunteerToken, {httpOnly: true})
                        .json({message: "Logged in Successfuly", volunteer: volunteerFromDB, volunteerToken: volunteerToken})
                    }else{
                        res.status(401).json({error: "Not authorized to be here"})
                    }

                }else{
                    res.status(400).json({error: "Password is wrong"})
                }
            }catch(err){
                res.status(400).json({message: "Invalid credentials"})
            }
        }
    },

    logout: async (req, res) => {
        res.clearCookie('volunteerToken');
        res.json({message: "Volunteer logged out"});
    },

    getLoggedInVolunteer: async (req, res) =>{
        try {
            // Verify the JWT from the cookie
            const volunteer = jwt.verify(req.cookies.volunteerToken, SECRET);
        
            // Find the volunteer using the ID from the token
            const loggedInVolunteer = await Volunteer.findOne({ _id: volunteer.id }).populate("address");

            if (!loggedInVolunteer) {
              // Volunteer not found in the database
              return res.status(404).json({ error: 'Logged-in volunteer not found' });
            }
        
            // Send the volunteer data in the response
            res.json(loggedInVolunteer);
          } catch (err) {
            console.error('Error fetching logged-in volunteer:', err);

            // If there's an error with JWT verification or finding the volunteer, handle the error
            console.error('Error fetching logged-in volunteer:', err);
            res.status(401).json({ error: 'Invalid or expired token' });
          }
    },

};