const Joi = require("joi");
const { isNotEmpty } = require("./common");
const { API_VALIDATION_ERROR } = require("../constants/error");
const errCode = API_VALIDATION_ERROR;

async function joiValidateOne({ schema, data }) {
  try {
    const options = {
      abortEarly: false,
      // stripUnknown: { objects: true },
    };
    await schema.validateAsync(data, options);
    return []; // no error
  } catch (error) {
    if (error && isNotEmpty(error.details)) {
      console.log("######joiValidateOne######");
      console.log(JSON.stringify(error.details));
      const errors = error.details.map(
        ({ message, type, path: _path, context }) => {
          let key = context.key;
          let value = context.value;
          let index = _path[0];
          if (type === "array.unique") {
            // special-case: schema.unique("....")
            key = context.path;
            _path.push(key);
            value = context.value[key];
          }
          const path = _path.join(".");
          return { message, type, path, key, value, index, errCode };
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
