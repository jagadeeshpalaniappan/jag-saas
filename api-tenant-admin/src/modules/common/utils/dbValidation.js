const { isNotEmpty } = require("./common");
const { DB_VALIDATION_ERROR } = require("../constants/error");
const errCode = DB_VALIDATION_ERROR;

/*
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
*/

function parseMongoValidationErrors({ dbErr, index }) {
  if (!dbErr) return null;
  console.log(JSON.stringify(dbErr.errors));
  const errors = [];
  for (const [key, val] of Object.entries(dbErr.errors)) {
    console.log("------docValidate------");
    console.log(JSON.stringify(val));
    const { message, type, path: _path, value } = val.properties;
    const path = `${index}.${_path}`;
    const field = key;
    errors.push({ message, type, path, field, value, index, errCode });
  }

  console.log("JSON.stringify(errors)");
  console.log(JSON.stringify(errors));
  return errors;
}

function docValidate({ doc, index }) {
  return new Promise((resolve) => {
    doc.validate((dbErr) => {
      if (dbErr) {
        const dbErrors = parseMongoValidationErrors({ dbErr, index });
        resolve(dbErrors); // has-errors
      } else {
        resolve([]); // no-errors
      }
    });
  });
}

async function docValidateMany(docs) {
  const validDocs = [];
  const invalidDocs = [];
  const errors = [];

  for (let i = 0; i < docs.length; i++) {
    const doc = docs[i];
    const dbErrors = await docValidate({ doc, index: i });
    if (isNotEmpty(dbErrors)) {
      invalidDocs.push(doc);
      errors.push(...dbErrors);
    } else validDocs.push(doc);
  }

  return { validDocs, invalidDocs, errors };
}

module.exports = { docValidate, docValidateMany };
