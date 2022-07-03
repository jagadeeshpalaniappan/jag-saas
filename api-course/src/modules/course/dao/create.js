const { Course } = require("../model/Course");
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

module.exports = { create };
