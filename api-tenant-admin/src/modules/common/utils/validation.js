const Joi = require("joi");
const { isNotEmpty } = require("./common");
const { VALIDATION_ERROR } = require("../constants/error");
const errCode = VALIDATION_ERROR;

function joiValidateOne({ schema, data }) {
  const { error } = Joi.validate(data, schema, {
    abortEarly: false,
    // stripUnknown: { objects: true },
  });
  if (error && isNotEmpty(error.details)) {
    console.log("######joiValidateOne######");
    console.log(JSON.stringify(error));
    const errors = error.details.map(({ message, type, path, context }) => {
      let field = context.key;
      let value = context.value;
      let index = path.split(".")[0];
      if (type === "array.unique") {
        // special-case: schema.unique("....")
        path = `${path}.${context.path}`;
        field = context.path;
        value = context.value[field];
      }

      return { message, type, path, field, value, index, errCode };
    });
    return errors;
  }
  return []; // no error
}

/*
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
*

/*
 "properties": {
    "message": "Error, expected `userName` to be unique. Value: `x25`",
    "type": "unique",
    "path": "userName",
    "value": "x25"
},
*/

module.exports = {
  joiValidateOne,
};
