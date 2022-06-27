const { main: generateCourses } = require("./courses");
const { main: generateModules } = require("./modules");
const { main: generateStudents } = require("./students");
const { main: generateUsers } = require("./users");
const { main: generateUserGroups } = require("./userGroups");

generateCourses();
generateModules();
generateStudents();
generateUsers();
generateUserGroups();
