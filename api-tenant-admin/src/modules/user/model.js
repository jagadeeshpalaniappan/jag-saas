const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const Joi = require("joi");

// #################### JOI #####################

// POST /api/users
const createSchema = Joi.object({
  userName: Joi.string().min(3).max(30),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
});

const createManySchema = Joi.array()
  .items(createSchema)
  .unique("userName", { ignoreUndefined: true })
  .unique("firstName", { ignoreUndefined: true });
// #################### MONGOOSE #####################

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

module.exports = { createSchema, createManySchema, UserSchema, User };
