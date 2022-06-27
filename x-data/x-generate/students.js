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
    noOfItems: 10,
    filePath: `${dirPrefix}/students/get/list/student/res.json`,
    meta,
    idPrefix: "studentId",
    namePrefix: "Student",
    itemMeta: {
      access: ["READ_STUDENT"],
    },
  });
  // students: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/students/get/list/teacher/res.json`,
    meta,
    idPrefix: "studentId",
    namePrefix: "Student",
    itemMeta: {
      access: ["READ_STUDENT", "ASSIGN_COURSE"],
    },
  });
  // students: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/students/get/list/tenantAdmin/res.json`,
    meta,
    idPrefix: "studentId",
    namePrefix: "Student",
    itemMeta: {
      access: [
        "READ_STUDENT",
        "UPDATE_STUDENT",
        "DELETE_STUDENT",
        "ASSIGN_COURSE",
      ],
    },
  });
}

module.exports = { main };
