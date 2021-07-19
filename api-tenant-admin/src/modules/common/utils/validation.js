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
  parseMongoValidationErrors,
};
