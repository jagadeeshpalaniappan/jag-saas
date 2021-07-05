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
    const { title, description, published, authorId } = req.body;
    const createdBy = "TMP-USER1"; // TODO: read loggedIn userId

    // TX:
    const savedUser = await dao.create({
      title,
      description,
      published,
      authorId,
      createdBy,
    });
    // RESP:
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error ocurred while saving user" });
  }
}

module.exports = { getAll, create };
