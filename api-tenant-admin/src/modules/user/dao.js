const { User } = require("./model");
const { getDbErr } = require("../app/error");
const MONGO_DUPLICATE_KEY = 11000;
/**
 * Get user list.
 * List the users in descending order of 'createdAt' timestamp.
 * @property {number} obj.skip - Number of users to be skipped.
 * @property {number} obj.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function getAll({ title, limit, skip }) {
  console.log("db:user:start:getAll");
  try {
    const query = {};
    if (title) query.title = { $regex: `.*${title}.*`, $options: "i" };
    const data = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
    console.log("db:user:end:getAll");
    return { data };
  } catch (err) {
    console.log("db:user:err:getAll");
    const error = getDbErr({ errSrc: "db:user:getAll", errObj: err });
    return { error };
  }
}

/**
 * Create new user
 * @property {string} obj.title - The username of title.
 * @property {string} obj.description - The description of user.
 * @property {string} obj.published - The published of user.
 * @returns {Users}
 */
async function create(users) {
  console.log("db:user:start:create");
  try {
    const data = await User.insertMany(users);
    console.log("db:user:end:create");
    return { data };
  } catch (err) {
    console.log("db:user:err:create");
    const { insertedDocs, writeErrors, errors, _message, ...errObj } = err;
    const error = getDbErr({
      errSrc: "db:user:create",
      errDetails: {
        writeErrors,
        validationErrors: errors,
        dbError: errObj,
      },
    });
    if (err.code === MONGO_DUPLICATE_KEY) {
      console.log("db:user:err:create:unique-validation");
      error.errCode = "USER_EXISTS";
      error.errReason = "User already exists";
    }
    return { data: insertedDocs, error };
  }
}

module.exports = { getAll, create };
