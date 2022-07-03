const { Course } = require("../model/Course");

async function createMany(courses) {
  try {
    const data = await Course.insertMany(courses);
    return data;
  } catch (error) {
    //duplicate key
    if (error && error.code === MONGO_DUPLICATE_KEY) {
      throw new Error(`[${obj.permissionId}] Course Already exists! `);
    }
    throw error;
  }
}

module.exports = { createMany };
