const dao = require("../dao");

const user = {
  userId: "teacherId1",
  userGroupIds: ["studentGroupId11"],
};

function getCourseGroups(user) {
  return { courseGroupIds: ["courseGroupId11"] };
}

/**
 * Get course list.
 * List the courses in descending order of 'createdAt' timestamp.
 * @property {number} req.query.title - Search Query - The title of course.
 * @property {number} req.query.skip - Number of courses to be skipped.
 * @property {number} req.query.limit - Limit number of courses to be returned.
 * @returns {Course[]}
 */
async function getAll(req, res, next) {
  try {
    // POPULATE:
    const { name, limit = 10, skip = 0 } = req.query;
    const { userId, userGroupIds } = user;
    const { courseGroupIds } = getCourseGroups(user);
    // TX:
    const courses = await dao.getAll({
      limit,
      skip,
      name,
      activeOnly: true,
      permissionId: "READ_LIMITED_COURSE",
      courseGroupIds,
      userGroupIds,
      userId,
    });
    // RESP:
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error ocurred while getting courses" });
  }
}

module.exports = { getAll };
