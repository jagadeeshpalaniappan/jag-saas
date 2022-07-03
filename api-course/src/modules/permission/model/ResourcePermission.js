const mongoose = require("mongoose");
const { PermissionSchema } = require("./Permission");

const ResourcePermissionSchema = new mongoose.Schema({
  accessorType: String,
  accessorId: String,
  permissions: [PermissionSchema],
});

module.exports = { ResourcePermissionSchema };
