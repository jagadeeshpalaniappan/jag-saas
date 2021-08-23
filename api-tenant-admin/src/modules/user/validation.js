const { createSchema, createManySchema } = require("./model");

const {
  docValidate,
  docValidateMany,
} = require("../common/utils/dbValidation");

const { joiValidateOne } = require("../common/utils/validation");

async function createOne({ logKey, payload: data, doc }) {
  console.log(`${logKey}:validn:start`);
  // API-VALIDATION:
  const apiErrors = joiValidateOne({ schema: createSchema, data });
  const dbErrors = await docValidate(doc);
  console.log(`${logKey}:validn:end`);
  return [...apiErrors, ...dbErrors];
}

async function createMany({ logKey, payload: data, docs }) {
  logKey = `${logKey}::validn`;
  console.log(`${logKey}:start`);
  // API-VALIDATION:
  const apiErrors = joiValidateOne({ schema: createManySchema, data });
  // const { errors: apiErrors } = joiValidateMany(createSchema, payload);

  // DB-VALIDATION:
  const { validDocs, errors: dbErrors } = await docValidateMany(docs);

  console.log(`${logKey}:end`);
  return { errors: [...apiErrors, ...dbErrors], data: validDocs };
}

module.exports = { createOne, createMany };
