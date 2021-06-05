// __tests__/CourseListContainer.test.js
import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import CourseListContainer from "../CourseListContainer";
import { COURSES_API } from "../../api";

jest.mock("../../cache", () => ({
  get: jest.fn(),
  set: jest.fn(),
}));

const courses = [
  {
    _id: "609b415556ea4269c491d875",
    title: "React",
    description: "React Tutorial",
    published: true,
    authorId: "101",
    createdBy: "TMP-USER1",
    createdAt: "2021-05-12T02:45:41.432Z",
    updatedAt: "2021-05-12T02:45:41.432Z",
    __v: 0,
  },
  {
    _id: "609b414c56ea4269c491d874",
    title: "Java",
    description: "Java Tutorial",
    published: true,
    authorId: "101",
    createdBy: "TMP-USER1",
    createdAt: "2021-05-12T02:45:32.578Z",
    updatedAt: "2021-05-12T02:45:32.578Z",
    __v: 0,
  },
  {
    _id: "609b414656ea4269c491d873",
    title: "JavaScript",
    description: "JavaScript Tutorial",
    published: true,
    authorId: "101",
    createdBy: "TMP-USER1",
    createdAt: "2021-05-12T02:45:26.872Z",
    updatedAt: "2021-05-12T02:45:26.872Z",
    __v: 0,
  },
];

const server = setupServer(
  rest.get(COURSES_API, (req, res, ctx) => {
    return res(ctx.json(courses));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("initialize and display courses", async () => {
  // init:
  render(<CourseListContainer />);

  // expect:
  await waitFor(() => screen.getByTestId("loading"));
  await waitFor(() => screen.getByRole("list"));
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(courses.length);
  listItems.forEach((listItem, idx) => {
    const { getByRole, getByTestId } = within(listItem);
    expect(getByRole("heading")).toHaveTextContent(courses[idx].title);
    expect(getByTestId("description")).toHaveTextContent(
      courses[idx].description
    );
  });
});

test("search and display courses", async () => {
  const searchResults = [courses[1]];

  const searchText = "Jav";
  server.use(
    rest.get(`${COURSES_API}?title=${searchText}`, (req, res, ctx) => {
      return res(ctx.json([courses[1]]));
    })
  );

  // init:
  render(<CourseListContainer />);

  // search:
  const searchInput = screen.getByRole("textbox");
  userEvent.type(searchInput, searchText);

  // expect:
  await waitFor(() => screen.getByTestId("loading"));
  await waitFor(() => screen.getByRole("list"));
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(searchResults.length);
  listItems.forEach((listItem, idx) => {
    const { getByRole, getByTestId } = within(listItem);
    expect(getByRole("heading")).toHaveTextContent(searchResults[idx].title);
    expect(getByTestId("description")).toHaveTextContent(
      searchResults[idx].description
    );
  });
});

test("initialize and handle server error", async () => {
  server.use(
    rest.get(COURSES_API, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // init:
  render(<CourseListContainer />);

  // expect:
  await waitFor(() => screen.getByTestId("loading"));
  await waitFor(() => screen.getByTestId("error"));

  expect(screen.getByTestId("error")).toHaveTextContent(
    "Error fetching courses."
  );
});

test("search and handle server error", async () => {
  const searchResults = [
    {
      id: 2,
      title: "Orange",
      description: "orange@economist.com",
    },
  ];

  const searchText = "Jav";
  server.use(
    rest.get(`${COURSES_API}?title=${searchText}`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // init:
  render(<CourseListContainer />);

  // search:
  const searchInput = screen.getByRole("textbox");
  userEvent.type(searchInput, searchText);

  // expect:
  await waitFor(() => screen.getByTestId("loading"));
  await waitFor(() => screen.getByTestId("error"));

  expect(screen.getByTestId("error")).toHaveTextContent(
    "Error fetching courses."
  );
});
