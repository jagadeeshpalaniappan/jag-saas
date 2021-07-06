const mongoose = require("mongoose");

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

module.exports = { UserSchema, User };
