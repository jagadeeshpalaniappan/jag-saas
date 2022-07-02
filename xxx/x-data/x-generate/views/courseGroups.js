const { generateFile, dirPrefix, viewer } = require("../utils");

const meta = {
  pageSize: 10,
  pageNo: 1,
  nextPage: "nextPageCursor",
  prevPage: "prevPageCursor",
  access: [],
};

function main() {
  // courseGroups: (viewer: student)
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

  // courseGroups: (viewer: teacher)
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

  // courseGroups: (viewer: tenantAdmin)
  generateFile({
    noOfItems: 10,
    filePath: `${dirPrefix}/${viewer.tenantAdminViewer}/courseGroups/get/list/res.json`,
    meta: {
      ...meta,
      access: ["CREATE_COURSE_GROUP"],
    },
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
