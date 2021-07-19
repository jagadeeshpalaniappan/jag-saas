const Joi = require("joi");
const { User } = require("./model");
const { getValidationErr } = require("../common/utils/error");
const { parseMongoValidationErrors } = require("../common/utils/validation");

// POST /api/users
const createUser = {
  userName: Joi.string().min(2).max(30).required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
};

const create = {
  body: Joi.alternatives().try(
    createUser,
    Joi.array().min(1).items(createUser)
  ),
  options: { contextRequest: true },
};

function seperateItems(items) {
  return items.reduce(
    (res, item) => {
      if (item.error) res.invalidItems.push(item);
      else res.validItems.push(item);
      return res;
    },
    { validItems: [], invalidItems: [] }
  );
}

function docValidate({ doc, ...rest }) {
  return new Promise((resolve) => {
    doc.validate((dbErr) => {
      const error = getDbError({ dbErr, ...rest });
      resolve({ doc, error });
    });
  });
}

async function docsValidate(docs) {
  const promises = docs.map((doc, index) => docValidate({ doc, index }));
  const items = await Promise.all(promises);
  const { validItems, invalidItems } = seperateItems(items);
  return { validItems, invalidItems, allItems: items };
}

function getDbError({ dbErr, ...rest }) {
  const errors = [];
  const valdnErrors = parseMongoValidationErrors(dbErr);
  if (valdnErrors) {
    valdnErrors.forEach((valdnErr) => {
      errors.push({ ...valdnErr, ...rest });
    });
  }

  return errors;
}

function getDbErrors(invalidItems) {
  const errors = [];
  invalidItems.map((invalidItem) => {
    const { doc, error, index } = invalidItem;
    const valdnErrors = parseMongoValidationErrors(invalidItem.error);
    valdnErrors.forEach((valdnErr) => {
      errors.push({ ...valdnErr, index, meta: doc });
    });
  });
  return errors;
}

async function createOne(user) {
  const userDoc = new User(user);
  const { doc, error } = await docValidate({ doc: userDoc });
  console.log({ doc, error });
  return { doc, error };
}

async function createMany(users, allowPartialSave) {
  console.log("createMany:init");
  const userDocs = users.map((user) => new User(user));
  const { validItems, invalidItems, allItems } = await docsValidate(userDocs);

  console.log("createMany");
  console.log({
    validItems,
    invalidItems,
    allItems,
  });

  // !hasValidItems? || hasinvalidItems && allowPartialSave?
  const hasErr =
    validItems.length === 0 || (invalidItems.length > 0 && !allowPartialSave);

  return {
    validItems,
    invalidItems,
    allItems,
    hasErr,
    // error: invalidItems,
    error: [].concat(...invalidItems.map(({ error }) => error)),
  };
}

module.exports = { create, createOne, createMany };
