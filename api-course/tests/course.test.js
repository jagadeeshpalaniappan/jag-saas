const request = require("supertest");
const { app } = require("../src/modules/app/express");
const { Course } = require("../src/modules/course/model");
const db = require("./db");

// Pass supertest agent for each test
const agent = request.agent(app);

// Setup connection to the database
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

const courses = [
  {
    title: "JavaScript",
    description: "JavaScript Tutorial",
    published: true,
    authorId: "101",
  },
  {
    title: "React",
    description: "React Tutorial",
    published: true,
    authorId: "101",
  },

  {
    title: "Java",
    description: "Java Tutorial",
    published: true,
    authorId: "102",
  },
];

describe("GET: /api/courses", () => {
  test("It should get courses", async () => {
    await Course.insertMany(courses);

    await agent
      .get("/api/courses")
      .expect(200)
      .then((res) => {
        // Check type and length
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(courses.length);

        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(courses[0]),
            expect.objectContaining(courses[1]),
            expect.objectContaining(courses[2]),
          ])
        );
      });
  });

  test("It should get courses find by title", async () => {
    await Course.insertMany(courses);

    await agent
      .get("/api/courses?title=java")
      .expect(200)
      .then((res) => {
        // Check type and length
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toEqual(2);

        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining(courses[0]),
            expect.objectContaining(courses[2]),
          ])
        );
      });
  });
});

describe("POST: /api/courses", () => {
  test("It should store a new course", async () => {
    await agent
      .post("/api/courses")
      .send(courses[0])
      .expect(201)
      .then((res) => {
        expect(res.body._id).toBeTruthy();
        Object.keys(courses[0]).forEach((key) => {
          expect(courses[0][key]).toBe(res.body[key]);
        });
      });
  });
  test("It should failed to store a new course - validation", async () => {
    const course = {
      // title: "JavaScript", // title is required
      description: "JavaScript Tutorial",
      published: true,
      authorId: "101",
    };
    await agent.post("/api/courses").send(course).expect(400);
  });
});
