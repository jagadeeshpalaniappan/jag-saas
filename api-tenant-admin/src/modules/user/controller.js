const { User } = require("./model");
const dao = require("./dao");
const validation = require("./validation");

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
async function createOne(req) {
  // POPULATE:
  const payload = req.body;
  payload.createdBy = "TMP-USER1"; // TODO: read loggedIn userId

  // VALIDATE:
  const { doc, error: validationErr } = await validation.createOne(payload);
  if (validationErr) return { status: 400, error: validationErr };

  // TX:
  const { data, error: dbErr } = await dao.createOne(doc);
  if (dbErr) return { status: 500, error: dbErr };

  // RESP:
  return { status: 201, success: data };
}

/**
 * Create new user
 * @property {string} req.body.title - The title of user.
 * @property {string} req.body.description - The description of user.
 * @property {boolean} req.body.published - The published status of user.
 * @property {string} req.body.authorId - The authorId of user.
 * @returns {User}
 */
async function createMany(req) {
  const logKey = req.originalUrl;
  console.log(`${logKey}:createMany:start`);

  // POPULATE:
  const payload = req.body;
  const createdBy = "TMP-USER1"; // TODO: read loggedIn userId
  const users = payload.map((user) => ({ ...user, createdBy }));
  const allowPartialSave = !!req.query.allowPartialSave;

  // VALIDATE:
  const validnRes = await validation.createMany(users, allowPartialSave);
  if (validnRes.hasErr) {
    console.log(`${logKey}:createMany:end:validationErr`);
    return { status: 400, error: validnRes.error };
  }

  // TX:
  const docs = validnRes.validItems.map(({ doc }) => doc);
  const { data, error: dbErr } = await dao.createMany(docs);
  if (dbErr) {
    console.log(`${logKey}:createMany:end:dbErr`);
    return { status: 500, error: dbErr };
  }

  // RESP:
  console.log(`${logKey}:createMany:end:resp`);
  return { status: 201, success: data };
}

/**
 * Create new user
 * @property {string} req.body.title - The title of user.
 * @property {string} req.body.description - The description of user.
 * @property {boolean} req.body.published - The published status of user.
 * @property {string} req.body.authorId - The authorId of user.
 * @returns {User}
 */
function create(req) {
  return Array.isArray(req.body) ? createMany(req) : createOne(req);
}

module.exports = { getAll, create };
