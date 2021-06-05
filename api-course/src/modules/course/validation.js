const Joi = require("joi");

// POST /api/courses
const createCourse = {
  body: {
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    published: Joi.boolean(),
    authorId: Joi.string().required(),
  },
};

module.exports = { createCourse };
