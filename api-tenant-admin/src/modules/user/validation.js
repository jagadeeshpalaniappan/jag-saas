const Joi = require("joi");
const { User } = require("./model");
const { getValidationErr } = require("../common/utils/error");
const { parseMongoValidationErrors } = require("../common/utils/validation");

// POST /api/users
const create = Joi.object({
  userName: Joi.string().min(2).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
});

async function createOne(user) {
  const userDoc = new User(user);
  const { doc, error } = await docValidate({ doc: userDoc });
  console.log({ doc, error });
  return { doc, error };
}

function joiValidateOne(schema, item, index) {
  const { error } = schema.validate(item);
  if (error && error.details && error.details.length > 0) {
    const errors = error.details.map(({ message, type, path, value }) => ({
      message,
      type,
      path,
      value,
      index,
    }));
    return errors;
  }
  return null; // no error
}

function joiValidateMany(schema, items = []) {
  const validItems = [];
  const invalidItems = [];
  const errors = [];

  items.forEach((item, index) => {
    const joiErrors = joiValidateOne(schema, item, index);
    if (joiErrors && joiErrors.length > 0) {
      invalidItems.push(item);
      errors.push(...joiErrors);
    } else validItems.push(item);
  });
  return { validItems, invalidItems, errors };
}

function createMany(users) {
  return joiValidateMany(create, users);
}

module.exports = { create, createOne, createMany };
