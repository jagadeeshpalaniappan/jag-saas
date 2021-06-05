const mongoose = require("mongoose");

/**
 * Course Schema
 */
const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    published: Boolean,
    authorId: { type: String, required: true },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true } // mongoose automatically handle 'createdAt' & 'updatedAt'
);

/**
 * @typedef Course
 */
const Course = mongoose.model("Course", CourseSchema);

module.exports = { CourseSchema, Course };
