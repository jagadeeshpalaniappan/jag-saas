const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // modules: (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/modules/get/list/student/res.json`,
    meta,
    idPrefix: "moduleId",
    namePrefix: "Module",
    itemMeta: {
      access: ["READ_MODULE"],
    },
  });
  // modules: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/modules/get/list/teacher/res.json`,
    meta,
    idPrefix: "moduleId",
    namePrefix: "Module",
    itemMeta: {
      access: ["READ_MODULE"],
    },
  });
  // modules: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/modules/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "moduleId",
    namePrefix: "Module",
    itemMeta: {
      access: ["READ_MODULE", "RENAME_MODULE"],
    },
  });
  // modules: (user: sysAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/modules/get/list/sysAdmin/res.json`,
    meta,
    idPrefix: "moduleId",
    namePrefix: "Module",
    itemMeta: {
      access: ["READ_MODULE", "UPDATE_MODULE", "DELETE_MODULE"],
    },
  });
}

module.exports = { main };
