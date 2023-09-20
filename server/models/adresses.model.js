const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: [true, "{PATH} is required"]
    },
    street: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    city: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    zipcode: {
        type: Number,
        required: [true, "{PATH} is required"]
    }
}, { timestamps: true });

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;