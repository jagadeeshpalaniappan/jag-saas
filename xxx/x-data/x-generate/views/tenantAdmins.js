const { generateFile, dirPrefix, viewer } = require("../utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // tenantAdmins:details (viewer: tenantAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/tenantAdmins/get/details/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Tenant Admin User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["tenantAdminUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // tenantAdmins:list (viewer: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/tenantAdmins/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER"],
    },
    idPrefix: "userId",
    namePrefix: "Tenant Admin User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["tenantAdminUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
}

module.exports = { main };
