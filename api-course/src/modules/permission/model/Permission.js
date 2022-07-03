const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema({
  permissionId: String,
  isActive: Boolean,
  startDate: Date,
  endDate: Date,
});

module.exports = { PermissionSchema };
