const Joi = require("joi");
const { User } = require("./model");
const { isNotEmpty } = require("../common/utils");
const { getValidationErr } = require("../common/utils/error");

const {
  docValidate,
  docValidateMany,
} = require("../common/utils/dbValidation");

const {
  joiValidateOne,
  joiValidateMany,
} = require("../common/utils/validation");

// POST /api/users
const create = Joi.object({
  userName: Joi.string().min(3).max(30),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
});

async function createOne({ logKey, payload, doc }) {
  console.log(`${logKey}:validn:start`);
  // API-VALIDATION:
  const apiErrors = joiValidateOne(create, payload);
  const dbErrors = await docValidate(doc);
  console.log(`${logKey}:validn:end`);
  return [...apiErrors, ...dbErrors];
}

async function createMany({ logKey, payload, docs }) {
  console.log(`${logKey}:createMany:validn:start`);
  // API-VALIDATION:
  const { errors: apiErrors } = joiValidateMany(create, payload);

  // DB-VALIDATION:
  const { validDocs, errors: dbErrors } = await docValidateMany(docs);

  console.log(`${logKey}:createMany:validn:end`);
  return { validationErrors: [...apiErrors, ...dbErrors], validDocs };
}

module.exports = { create, createOne, createMany };
