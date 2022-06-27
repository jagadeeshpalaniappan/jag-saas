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
    idPrefix: "user-",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
  });

  // users: (user: teacher)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/users/get/details/teacher/res.json`,
    idPrefix: "user-",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER"],
    },
  });

  // users: (user: tenantAdmin)
  generateFile({
    noOfItems: 1,
    isDetail: true,
    filePath: `${dirPrefix}/users/get/details/tenantAdmin/res.json`,
    idPrefix: "user-",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
  });

  // users: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/users/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "user-",
    namePrefix: "User",
    itemMeta: {
      access: ["READ_USER", "UPDATE_USER", "DELETE_USER"],
    },
  });
}

module.exports = { main };
