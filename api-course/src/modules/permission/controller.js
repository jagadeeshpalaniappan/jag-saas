const { Course } = require("./model");
const dao = require("./dao");

/**
 * Get course list.
 * List the courses in descending order of 'createdAt' timestamp.
 * @property {number} req.query.title - Search Query - The title of course.
 * @property {number} req.query.skip - Number of courses to be skipped.
 * @property {number} req.query.limit - Limit number of courses to be returned.
 * @returns {Course[]}
 */
async function getAccessibleResources(req, res, next) {
  try {
    let payload = req.body;
    if (req.method === "GET") {
      payload = req.query;
      const userGroupIds = req.query.userGroupIds || "";
      payload.userGroupIds = userGroupIds.split(",");
      payload.activeOnly = req.query.activeOnly !== "false";
    }
    // POPULATE:
    const {
      limit = 10,
      skip = 0,
      activeOnly,
      accessCode,
      resourceType,
      resourceId,
      userId,
      userGroupIds,
    } = payload;

    // TX:
    const courses = await dao.getAccessibleResources({
      limit,
      skip,
      activeOnly,
      accessCode,
      resourceType,
      resourceId,
      userId,
      userGroupIds,
    });
    // RESP:
    res.json(courses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error ocurred while getting permissions", error });
  }
}

/**
 * Create new course
 * @property {string} req.body.title - The title of course.
 * @property {string} req.body.description - The description of course.
 * @property {boolean} req.body.published - The published status of course.
 * @property {string} req.body.authorId - The authorId of course.
 * @returns {Course}
 */
async function create(req, res, next) {
  try {
    // POPULATE:
    const createdBy = "TMP-USER1"; // TODO: read loggedIn userId
    const permissions = Array.isArray(req.body) ? req.body : [req.body];
    // TX:
    const savedCourse = await dao.create(permissions);
    // RESP:
    res.status(201).json(savedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error ocurred while saving permission", error });
  }
}

module.exports = { getAccessibleResources, create };
