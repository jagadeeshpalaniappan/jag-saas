const mongoose = require("mongoose");

/**
 * AccessMapping Schema
 */
const PermissionSchema = new mongoose.Schema(
  {
    entityType: String,
    entityId: String,
    resourceType: String,
    resourceId: String,
    accountId: String,
    accessCodes: String,
    isActive: Boolean,
    startDate: Date,
    endDate: Date,
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
