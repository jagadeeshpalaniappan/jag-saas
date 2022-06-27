const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // userGroups: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/userGroups/get/list/teacher/res.json`,
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
    filePath: `${dirPrefix}/userGroups/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "userGroupId",
    namePrefix: "User Group",
    itemMeta: {
      access: ["READ_USER_GROUP", "UPDATE_USER_GROUP", "DELETE_USER_GROUP"],
    },
  });
}

module.exports = { main };
