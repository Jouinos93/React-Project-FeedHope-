const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Addresses = require("./adresses.model");

const VolunteerSchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: [true, "The name is required"]
  },
  website: {
    type: String,
  },
  logo: {
    type: String,
  },
  phone: {
    type: Number,
    required: [true, "Phone is required"],
    unique: [true, "This phone number is already used!"]
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
    validate: {
      validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  motorized: {
    type: Boolean,
    default: false
  },
  vehicleType: {
    type: String,
    // validate: {
    //     validator: function (value) {
    //       return ['Moto', 'Car', 'Van', 'Truck'].includes(value);
    //     },
    //     message: 'You can only use those : Moto, Car , Van or Truck'
    // },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

VolunteerSchema.plugin(mongooseUniqueValidator);

VolunteerSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

VolunteerSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});

VolunteerSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});

const Volunteer = mongoose.model("Volunteer", VolunteerSchema);
module.exports = Volunteer;