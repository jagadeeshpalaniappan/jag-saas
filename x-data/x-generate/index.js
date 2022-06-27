const { main: generateCourses } = require("./courses");
const { main: generateCourseGroups } = require("./courseGroups");
const { main: generateModules } = require("./modules");
const { main: generateStudents } = require("./students");
const { main: generateUsers } = require("./users");
const { main: generateUserGroups } = require("./userGroups");

generateModules();

generateUsers();
generateUserGroups();
generateStudents(); // get all users where userGroup=STUDENT

generateCourses();
generateCourseGroups();
