const dao = require("../dao");
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
    const { name, description, published, authorId, resourcePermissions } =
      req.body;
    const createdBy = "TMP-USER1"; // TODO: read loggedIn userId

    // TX:
    const savedCourse = await dao.create({
      name,
      description,
      published,
      authorId,
      createdBy,
      resourcePermissions,
    });
    // RESP:
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error ocurred while saving course" });
  }
}

module.exports = { create };
