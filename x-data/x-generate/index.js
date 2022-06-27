const { main: genCourses } = require("./courses");
const { main: genModules } = require("./modules");
const { main: genStudents } = require("./students");
const { main: genUsers } = require("./users");

genCourses();
genModules();
genStudents();
genUsers();
