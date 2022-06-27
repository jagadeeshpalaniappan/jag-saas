const { generateFile, dirPrefix, viewer } = require("./utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
};

function main() {
  // courseGroups: (user: student)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.studentViewer}/courseGroups/get/list/res.json`,
    meta,
    idPrefix: "courseGroupId",
    namePrefix: "Course Group",
    itemMeta: {
      access: ["READ_COURSE_GROUP"],
    },
  });

  // courseGroups: (user: teacher)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.teacherViewer}/courseGroups/get/list/res.json`,
    meta,
    idPrefix: "courseGroupId",
    namePrefix: "Course Group",
    itemMeta: {
      access: ["READ_COURSE_GROUP"],
    },
  });

  // courseGroups: (user: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/courseGroups/get/list/res.json`,
    meta,
    idPrefix: "courseGroupId",
    namePrefix: "Course Group",
    itemMeta: {
      access: [
        "READ_COURSE_GROUP",
        "UPDATE_COURSE_GROUP",
        "DELETE_COURSE_GROUP",
      ],
    },
  });
}

module.exports = { main };
