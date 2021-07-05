const { User } = require("./model");

/**
 * Get user list.
 * List the users in descending order of 'createdAt' timestamp.
 * @property {number} obj.skip - Number of users to be skipped.
 * @property {number} obj.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function getAll({ title, limit, skip }) {
  const query = {};
  if (title) query.title = { $regex: `.*${title}.*`, $options: "i" };

  return User.find(query)
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
}

/**
 * Create new user
 * @property {string} obj.title - The username of title.
 * @property {string} obj.description - The description of user.
 * @property {string} obj.published - The published of user.
 * @returns {User}
 */
async function create(obj) {
  const user = new User(obj);
  const savedUser = await user.save();
  return savedUser;
}

module.exports = { getAll, create };
