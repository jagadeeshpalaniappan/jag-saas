const Joi = require("joi");

// POST /api/users
const createUser = {
  userName: Joi.string().min(2).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
};

const create = {
  body: Joi.alternatives().try(
    createUser,
    Joi.array().min(1).items(createUser)
  ),
  options: { contextRequest: true },
};

module.exports = { create };
