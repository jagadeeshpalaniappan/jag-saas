const { main: generateModules } = require("./modules");

const { main: generateUsers } = require("./users");
const { main: generateUserGroups } = require("./userGroups");
const { main: generateStudents } = require("./students");
const { main: generateTeachers } = require("./teachers");
const { main: generateTenantAdmins } = require("./tenantAdmins");

const { main: generateCourses } = require("./courses");
const { main: generateCourseGroups } = require("./courseGroups");

generateModules();

generateUsers();
generateUserGroups();
generateStudents(); // get all users where userGroup=studentUserGroupId1
generateTeachers(); // get all users where userGroup=teacherUserGroupId1
generateTenantAdmins(); // get all users where userGroup=tenantAdminUserGroupId1

generateCourses();
generateCourseGroups();
