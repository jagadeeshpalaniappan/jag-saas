const { Course } = require("./model");

/**
 * Get course list.
 * List the courses in descending order of 'createdAt' timestamp.
 * @property {number} obj.skip - Number of courses to be skipped.
 * @property {number} obj.limit - Limit number of courses to be returned.
 * @returns {Course[]}
 */
async function getAll({ title, limit, skip }) {
  const query = {};
  if (title) query.title = { $regex: `.*${title}.*`, $options: "i" };

  return Course.find(query)
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
}

/**
 * Create new course
 * @property {string} obj.title - The coursename of title.
 * @property {string} obj.description - The description of course.
 * @property {string} obj.published - The published of course.
 * @returns {Course}
 */
async function create(obj) {
  const course = new Course(obj);
  const savedCourse = await course.save();
  return savedCourse;
}

module.exports = { getAll, create };
