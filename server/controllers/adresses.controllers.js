const Adress = require("../models/adresses.model")

// READ ALL
module.exports.readAll = (req, res) => {
    Adress.find()
    .then((allAdresses) =>{
        res.json(allAdresses)
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    })
}

// CREATE
module.exports.create = (req, res) => {
    Adress.create(req.body)
    .then((newAdress)=>{
        res.json({Adress: newAdress})
    })
    .catch((err)=>{
        res.status(400).json({ message: "Something went wrong", error: err });
    });
};

//READ ONE
module.exports.findOne = (req, res) => {
    Adress.findOne({ _id: req.params.id })
        .then(oneSingleAdress => {
            res.json({ Adress: oneSingleAdress })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
    }

// UPDATE 
module.exports.push = (req, res) =>{
    Adress.findOneAndUpdate({_id: req.params.id}, {$push: {adress: req.body}},
    {new: true, runValidators: true})
    .then((updatedAdress)=>{
        res.json({Adress: updatedAdress})
    })
    .catch((err) => {
        res.status(400).json({ message: 'Something went wrong', error: err })
    });
}

// DELETE
module.exports.delete = (req, res) => {
    Adress.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
}