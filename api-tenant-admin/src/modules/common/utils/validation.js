const Joi = require("joi");
const { isNotEmpty } = require("./common");
const { VALIDATION_ERROR } = require("../constants/error");
const errCode = VALIDATION_ERROR;

async function joiValidateOne({ schema, data }) {
  try {
    const options = {
      abortEarly: false,
      // stripUnknown: { objects: true },
    };
    const value = await schema.validateAsync(data, options);
    console.log("######joiValidateOne######1");
    console.log(JSON.stringify(value));
    return []; // no error
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error && isNotEmpty(error.details)) {
      console.log("######joiValidateOne######3");
      console.log(JSON.stringify(error));
      const errors = error.details.map(
        ({ message, type, path: _path, context }) => {
          let field = context.key;
          let value = context.value;
          let index = _path[0];
          if (type === "array.unique") {
            // special-case: schema.unique("....")
            field = context.path;
            _path.push(field);
            value = context.value[field];
          }
          const path = _path.join(".");
          return { message, type, path, field, value, index, errCode };
        }
      );
      return errors;
    }
    return []; // no error
  }

  const { error } = Joi.validate();
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
