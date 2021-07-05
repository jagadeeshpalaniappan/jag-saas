const mongoose = require("mongoose");

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    published: Boolean,
    authorId: { type: String, required: true },
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
