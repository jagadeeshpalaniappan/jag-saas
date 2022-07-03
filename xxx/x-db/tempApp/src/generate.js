const { create } = require("./create");
const resourcePermissions = [
  {
    accessorType: "COURSE_GROUP",
    accessorId: "courseGroupId1",
    permissions: [
      {
        permissionId: "READ_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
      {
        permissionId: "UPDATE_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    ],
  },
  {
    accessorType: "USER_GROUP",
    accessorId: "studentGroupId1",
    permissions: [
      {
        permissionId: "READ_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    ],
  },
  {
    accessorType: "USER",
    accessorId: "teacherId1",
    permissions: [
      {
        permissionId: "READ_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
      {
        permissionId: "UPDATE_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
      {
        permissionId: "DELETE_LIMITED_COURSE",
        isActive: true,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      },
    ],
  },
];

function generateData({ noOfItems, startNo, namePrefix }) {
  return new Array(noOfItems).fill(0).map((_, i) => ({
    name: `${namePrefix} ${i + startNo}`,
    description: `${namePrefix} ${i + startNo} desc`,
    published: true,
    authorId: "authorId1",

    isActive: true,
    resourcePermissions,

    createdBy: "userId1",
    updatedBy: "userId1",
  }));
}

async function generateAndCreateData() {
  const inputData = generateData({
    noOfItems: 10,
    startNo: 1,
    namePrefix: "Course",
  });
  const respData = await create(inputData);
  console.log("respData");
  console.log(respData);
  process.exit(0);
}

module.exports = { generateAndCreateData };
