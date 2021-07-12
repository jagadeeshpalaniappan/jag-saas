const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true } // mongoose automatically handle 'createdAt' & 'updatedAt'
);

/**
 * @typedef User
 */
const User = mongoose.model("User", UserSchema);
UserSchema.plugin(uniqueValidator);

module.exports = { UserSchema, User };
