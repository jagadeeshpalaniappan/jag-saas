const { isNotEmpty } = require("./common");

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
  return []; // no error
}

function joiValidateMany(schema, items = []) {
  const validItems = [];
  const invalidItems = [];
  const errors = [];

  items.forEach((item, index) => {
    const joiErrors = joiValidateOne(schema, item, index);
    if (isNotEmpty(joiErrors)) {
      invalidItems.push(item);
      errors.push(...joiErrors);
    } else validItems.push(item);
  });
  return { validItems, invalidItems, errors };
}

/*
 "properties": {
    "message": "Error, expected `userName` to be unique. Value: `x25`",
    "type": "unique",
    "path": "userName",
    "value": "x25"
},
*/

function parseMongoValidationErrors(dbErr) {
  if (!dbErr) return null;
  console.log(JSON.stringify(dbErr.errors));
  const errors = [];
  for (const [key, val] of Object.entries(dbErr.errors)) {
    console.log(JSON.stringify(val));
    const { message, type, path, value } = val.properties;
    errors.push({ message, type, path, value });
  }

  console.log("JSON.stringify(errors)");
  console.log(JSON.stringify(errors));
  return errors;
}

module.exports = {
  joiValidateOne,
  joiValidateMany,
  parseMongoValidationErrors,
};
