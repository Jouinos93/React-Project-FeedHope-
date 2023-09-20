const mongoose = require("mongoose")
const Doner = require("./doners.model");
const Volunteer = require("./volunteers.model");

const GivenFoodSchema = new mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String,
        required: [true, "{PATH} is required"]
    },
    qty: {
        type: Number,
        required: [true, "{PATH} is required"]
    },
    status: {
        type: String,
        required: [true, "{PATH} is required"],
        default: "Pending"
    },
    canWait: {
        type: Boolean,
        required: [true, "{PATH} is required"]
    },
    toDeliverBefore: {
        type: Date,
        required: [true, "{PATH} is required"],
        default: Date.now()
    },
    volunteerAble: {type:mongoose.Schema.ObjectId, ref:"Volunteer",default: null},
    doner: {type:mongoose.Schema.ObjectId, ref:"Doner"}

}, {timestamps: true})

const GivenFood = mongoose.model("GivenFood", GivenFoodSchema);
module.exports = GivenFood;