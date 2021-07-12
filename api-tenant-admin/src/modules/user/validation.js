const Joi = require("joi");
const { User } = require("./model");
const { getValidationErr } = require("../common/utils/error");

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

function docValidate(doc, index = 0) {
  return new Promise((resolve) => {
    doc.validate((error) => {
      resolve({ doc, error, index });
    });
  });
}

async function docsValidate(docs) {
  const promises = docs.map((doc, index) => docValidate(doc, index));
  const items = await Promise.all(promises);
  const { validItems, invalidItems } = seperateItems(items);
  return { validItems, invalidItems, allItems: items };
}

async function createOne(user) {
  const userDoc = new User(user);
  const { doc, error } = await docValidate(userDoc);
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

  // const error = invalidItems.map((invalidItem) =>
  //   getValidationErr({ validationErrors: invalidItem.error })
  // );
  return { validItems, invalidItems, allItems, hasErr, error: invalidItems };
}

module.exports = { create, createOne, createMany };
