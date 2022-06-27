const { main: genCourses } = require("./courses");
const { main: genModules } = require("./modules");
const { main: genStudents } = require("./students");
const { main: genUsers } = require("./users");
const { main: genUserGroups } = require("./userGroups");

genCourses();
genModules();
genStudents();
genUsers();
genUserGroups();
