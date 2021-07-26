const { User } = require("./model");
const { parseMongoValidationErrors } = require("../common/utils/validation");

function getDbError(dbErr) {
  const errors = [];
  const valdnErrors = parseMongoValidationErrors(dbErr);
  if (valdnErrors) {
    valdnErrors.forEach((valdnErr) => {
      errors.push(valdnErr);
    });
  }

  return errors;
}

function docValidate(doc) {
  return new Promise((resolve) => {
    doc.validate((dbErr) => {
      if (dbErr) {
        resolve(getDbError(dbErr)); // return error
      } else {
        resolve(); // return null
      }
    });
  });
}

async function docValidateMany(docs) {
  const validDocs = [];
  const invalidDocs = [];
  const errors = [];

  for (const doc of docs) {
    const error = await docValidate(doc);
    if (error) {
      invalidDocs.push(doc);
      errors.push(error);
    } else validDocs.push(doc);
  }
  return { validDocs, invalidDocs, errors };
}

async function createOne(user) {
  const userDoc = new User(user);
  const { doc, error } = await docValidate({ doc: userDoc });
  console.log({ doc, error });
  return { doc, error };
}

async function createMany(userDocs) {
  return docValidateMany(userDocs);
}

module.exports = { createOne, createMany };
