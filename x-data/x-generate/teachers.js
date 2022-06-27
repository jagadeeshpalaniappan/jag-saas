const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // teachers:list (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/teachers/get/list/student/res.json`,
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
    filePath: `${dirPrefix}/teachers/get/details/teacher/res.json`,
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
    filePath: `${dirPrefix}/teachers/get/list/teacher/res.json`,
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
    filePath: `${dirPrefix}/teachers/get/list/tenantAdmin/res.json`,
    meta,
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
