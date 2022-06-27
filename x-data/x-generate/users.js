const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // users: (user: student)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/users/get/details/student/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users: (user: teacher)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/users/get/details/teacher/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users: (user: tenantAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/users/get/details/tenantAdmin/res.json`,
    idPrefix: "userId",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["userGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // users: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/users/get/list/tenantAdmin/res.json`,
    meta,
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
