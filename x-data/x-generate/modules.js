const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // modules: (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.studentViewer}/modules/get/list/res.json`,
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
    filePath: `${dirPrefix}/${viewer.teacherViewer}/modules/get/list/res.json`,
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
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/modules/get/list/res.json`,
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
    filePath: `${dirPrefix}/${viewer.sysAdminViewer}/modules/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_MODULE"],
    },
    idPrefix: "moduleId",
    namePrefix: "Module",
    itemMeta: {
      access: ["READ_MODULE", "UPDATE_MODULE", "DELETE_MODULE"],
    },
  });
}

module.exports = { main };
