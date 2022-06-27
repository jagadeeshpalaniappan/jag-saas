const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // tenantAdmins:details (user: tenantAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/tenantAdmins/get/details/tenantAdmin/res.json`,
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

  // tenantAdmins:list (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/tenantAdmins/get/list/tenantAdmin/res.json`,
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
}

module.exports = { main };
