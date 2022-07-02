const { generateFile, dirPrefix, viewer } = require("../utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // users:details (viewer: student)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.studentViewer}/users/get/details/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users:details (viewer: teacher)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/users/get/details/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users:details (viewer: tenantAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/users/get/details/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users: (viewer: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/users/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER"],
    },
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
}

module.exports = { main };
