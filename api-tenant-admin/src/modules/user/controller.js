const { User } = require("./model");
const dao = require("./dao");
const valdn = require("./validation");

const { isNotEmpty } = require("../common/utils");

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
  const logKey = `${req.baseUrl}::createOne`;
  console.log(`${logKey}::start`);

  // POPULATE:
  const payload = req.body;
  const createdBy = "TMP-USER1"; // TODO: read loggedIn userId
  const doc = new User({ ...payload, createdBy });

  // VALIDATE:
  const validationErrors = await valdn.createOne({
    logKey,
    payload,
    doc,
  });
  if (isNotEmpty(validationErrors)) {
    console.log(`${logKey}:end:validationErr`);
    return { status: 400, errors: validationErrors };
  }

  // TX:
  const { data, error: dbErr } = await dao.createOne({ logKey, doc });
  if (dbErr) {
    console.log(`${logKey}::end:dbErr`);
    return { status: 500, errors: dbErr };
  }

  // RESP:
  console.log(`${logKey}::end`);
  return { ok: true, status: 201, data };
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
  let logKey = `${req.baseUrl}::createMany`;

  console.log(`${logKey}:start`);
  const createdBy = "TMP-USER1"; // TODO: read loggedIn userId
  const errors = [];

  // POPULATE:
  const payload = req.body;
  const docs = payload.map((user) => new User({ ...user, createdBy }));
  const allowPartialSave = req.query.allowPartialSave === "true";

  // VALIDATE:
  const { errors: validationErrors, data: validDocs } = await valdn.createMany({
    logKey,
    payload,
    docs,
  });

  const doPartialSave = allowPartialSave && isNotEmpty(validDocs);
  if (isNotEmpty(validationErrors)) {
    console.log(`${logKey}:end:failed:validnErr`);
    errors.push(...validationErrors);
    if (!doPartialSave) {
      return { status: 400, errors };
    } else {
      console.log(`${logKey}:doingPartialSave`);
    }
  }

  // TX:
  const { errors: dbErrors, data } = await dao.createMany({
    logKey,
    docs: validDocs,
  });

  if (isNotEmpty(dbErrors)) {
    console.log(`${logKey}:end:failed:dbErr`);
    errors.push(...dbErrors);
    return { status: 500, data, errors };
  }

  // RESP:
  console.log(`${logKey}:end:success`);
  return { ok: true, status: 201, data, errors };
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
