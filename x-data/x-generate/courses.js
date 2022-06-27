const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // courses: (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.studentViewer}/courses/get/list/res.json`,
    meta,
    idPrefix: "courseId",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE"],
    },
  });
  // courses: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/courses/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_COURSE"],
    },
    idPrefix: "courseId",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE", "UPDATE_COURSE"],
    },
  });
  // courses: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/courses/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_COURSE"],
    },
    idPrefix: "courseId",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE", "UPDATE_COURSE", "DELETE_COURSE"],
    },
  });
}

module.exports = { main };
