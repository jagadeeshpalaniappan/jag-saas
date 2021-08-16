const { isNotEmpty } = require("./common");
const { parseMongoValidationErrors } = require("./validation");

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

function docValidate(doc) {
  return new Promise((resolve) => {
    doc.validate((dbErr) => {
      if (dbErr) {
        const dbErrors = parseMongoValidationErrors(dbErr);
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

  for (const doc of docs) {
    const dbErrors = await docValidate(doc);
    if (isNotEmpty(dbErrors)) {
      invalidDocs.push(doc);
      errors.push(...dbErrors);
    } else validDocs.push(doc);
  }
  return { validDocs, invalidDocs, errors };
}

module.exports = { docValidate, docValidateMany };
