const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // teachers:list (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.studentViewer}/teachers/get/list/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Teacher User",
    itemMeta: {
      access: ["READ_USER"],
    },
    itemData: {
      userGroupIds: ["teacherUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // teachers:details (user: teacher)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/teachers/get/details/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Teacher User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["teacherUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // teachers:list (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/teachers/get/list/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Teacher User",
    itemMeta: {
      access: ["READ_USER"],
    },
    itemData: {
      userGroupIds: ["teacherUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });

  // teachers: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/teachers/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER"],
    },
    idPrefix: "userId",
    namePrefix: "Teacher User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
    itemData: {
      userGroupIds: ["teacherUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
}

module.exports = { main };
