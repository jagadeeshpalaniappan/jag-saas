const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema({
  accessCode: String,
  isActive: Boolean,
  startDate: Date,
  endDate: Date,
});

/**
 * AccessMapping Schema
 */
const PermissionSchema = new mongoose.Schema(
  {
    resourceType: String,
    resourceId: String,
    accessorType: String,
    accessorId: String,
    access: [AccessSchema],
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true } // mongoose automatically handle 'createdAt' & 'updatedAt'
);

/**
 * @typedef Course
 */
const Permission = mongoose.model("Permission", PermissionSchema);

module.exports = { PermissionSchema, Permission };
