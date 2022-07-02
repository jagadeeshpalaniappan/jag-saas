const { generateFile, dirPrefix, viewer } = require("../utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // sysAdmins:details (viewer: sysAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.sysAdminViewer}/sysAdmins/get/details/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "System Admin User",
    itemMeta: {
      access: [
        "READ_SYS_ADMIN_USER",
        "UPDATE_SYS_ADMIN_USER",
        "DELETE_SYS_ADMIN_USER",
      ],
    },
    itemData: {
      userGroupIds: ["sysAdminUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // sysAdmins:list (viewer: sysAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.sysAdminViewer}/sysAdmins/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_SYS_ADMIN_USER"],
    },
    idPrefix: "userId",
    namePrefix: "System Admin User",
    itemMeta: {
      access: [
        "READ_SYS_ADMIN_USER",
        "UPDATE_SYS_ADMIN_USER",
        "DELETE_SYS_ADMIN_USER",
      ],
    },
    itemData: {
      userGroupIds: ["sysAdminUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
}

module.exports = { main };
