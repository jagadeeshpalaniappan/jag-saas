const { generateFile, dirPrefix } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // courses: (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/courses/get/list/student/res.json`,
    meta,
    idPrefix: "course-",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE"],
    },
  });
  // courses: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/courses/get/list/teacher/res.json`,
    meta,
    idPrefix: "course-",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE", "UPDATE_COURSE"],
    },
  });
  // courses: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/courses/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "course-",
    namePrefix: "Course",
    itemMeta: {
      access: ["READ_COURSE", "UPDATE_COURSE", "DELETE_COURSE"],
    },
  });
}

module.exports = { main };
