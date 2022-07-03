const mongoose = require("mongoose");
const {
  ResourcePermissionSchema,
} = require("../../../modules/permission/model/ResourcePermission");

/**
 * Course Schema
 */
const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    published: Boolean,
    authorId: { type: String, required: true },

    isActive: Boolean,
    resourcePermissions: [ResourcePermissionSchema],

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
