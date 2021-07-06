const { User } = require("./model");
const dao = require("./dao");

/**
 * Get user list.
 * List the users in descending order of 'createdAt' timestamp.
 * @property {number} req.query.title - Search Query - The title of user.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
async function getAll(req, res, next) {
  try {
    // POPULATE:
    const { title, limit = 10, skip = 0 } = req.query;
    // TX:
    const users = await dao.getAll({ title, limit, skip });
    // RESP:
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error ocurred while getting users" });
  }
}

/**
 * Create new user
 * @property {string} req.body.title - The title of user.
 * @property {string} req.body.description - The description of user.
 * @property {boolean} req.body.published - The published status of user.
 * @property {string} req.body.authorId - The authorId of user.
 * @returns {User}
 */
async function create(req, res, next) {
  try {
    // POPULATE:
    const payload = Array.isArray(req.body) ? req.body : [req.body];
    const createdBy = "TMP-USER1"; // TODO: read loggedIn userId
    const users = payload.map((user) => ({ ...user, createdBy }));

    // TX:
    const { data, error } = await dao.create(users);
    if (error) res.status(500).json({ data, error });

    // RESP:
    const resBody = Array.isArray(req.body) ? data : data[0];
    res.status(201).json(resBody);
  } catch (error) {
    console.error("user:create", error);
    res.status(500).json({ message: "Error ocurred while saving user", error });
  }
}

module.exports = { getAll, create };
