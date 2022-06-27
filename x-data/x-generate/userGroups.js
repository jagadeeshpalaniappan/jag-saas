const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // userGroups: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/userGroups/get/list/res.json`,
    meta,
    idPrefix: "userGroupId",
    namePrefix: "User Group",
    itemMeta: {
      access: ["READ_USER_GROUP"],
    },
  });
  // userGroups: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/userGroups/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_USER_GROUP"],
    },
    idPrefix: "userGroupId",
    namePrefix: "User Group",
    itemMeta: {
      access: ["READ_USER_GROUP", "UPDATE_USER_GROUP", "DELETE_USER_GROUP"],
    },
  });
}

module.exports = { main };
