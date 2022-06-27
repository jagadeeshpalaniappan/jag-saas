const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // students:details (viewer: student)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/${viewer.studentViewer}/students/get/details/res.json`,
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
  // students: (viewer: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/students/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER"],
    },
    idPrefix: "userId",
    namePrefix: "Student User",
    itemMeta: {
      access: ["READ_USER", "ASSIGN_COURSE"],
    },
    itemData: {
      userGroupIds: ["studentUserGroupId1", "userGroupId2", "userGroupId3"],
    },
  });
  // students: (viewer: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/students/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER"],
    },
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
