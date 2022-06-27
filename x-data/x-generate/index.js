const { main: generateModules } = require("./views/modules");

const { main: generateUsers } = require("./views/users");
const { main: generateUserGroups } = require("./views/userGroups");
const { main: generateStudents } = require("./views/students");
const { main: generateTeachers } = require("./views/teachers");
const { main: generateTenantAdmins } = require("./views/tenantAdmins");
const { main: generateSysAdmins } = require("./views/sysAdmins");

const { main: generateCourses } = require("./views/courses");
const { main: generateCourseGroups } = require("./views/courseGroups");

generateModules();

generateUsers();
generateUserGroups();
generateStudents(); // get all users where userGroup=studentUserGroupId1
generateTeachers(); // get all users where userGroup=teacherUserGroupId1
generateTenantAdmins(); // get all users where userGroup=tenantAdminUserGroupId1
generateSysAdmins(); // get all users where userGroup=sysAdminUserGroupId1

generateCourses();
generateCourseGroups();
