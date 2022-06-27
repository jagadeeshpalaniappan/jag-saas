const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // students: (user: student)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/students/get/details/student/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Student User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
    itemData: {
      userGroupIds: ["studentUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
  // students: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/students/get/list/teacher/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Student User",
    itemMeta: {
      access: ["READ_USER", "ASSIGN_COURSE"],
    },
    itemData: {
      userGroupIds: ["studentUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
  // students: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/students/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "userId",
    namePrefix: "Student User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER", "ASSIGN_COURSE"],
    },
    itemData: {
      userGroupIds: ["studentUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
}

module.exports = { main };
