const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Adresses = require("./adresses.model");

const DonerSchema = new mongoose.Schema({
    donerName: {
      type: String,
      required: [true, "First name is required"]
    },
    website: {
      type: String,
    },
    logo: {
      type: String,
    },
    phone:{
        type: Number,
        required: [true, "Phone is required"],
        unique: [true, "Phone num already used"]
    },
    address:{type:mongoose.Schema.ObjectId, ref:"Address"},
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists"],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be 8 characters or longer"]
    }
  }, {timestamps: true});
  DonerSchema.plugin(mongooseUniqueValidator);
  
  DonerSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

  DonerSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });

  DonerSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  const Doner = mongoose.model("Doner", DonerSchema)
  module.exports = Doner;

// Adresses.pre('validate', function(next) {
//     console.log('2');
//     next();
//   });
  
// Adresses.pre('save', function(next) {
//     console.log('3');
//     next();
//   });
  
// Doner.pre('validate', function(next) {
//     console.log('1');
//     next();
//   });
  
// Doner.pre('save', function(next) {
//     console.log('4');
//     next();
//   });