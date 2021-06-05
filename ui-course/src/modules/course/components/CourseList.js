import React from "react";
import PropTypes from "prop-types";
import CourseListItem from "./CourseListItem";
function CourseList({ courses }) {
  return (
    <ul className="list-group my-3">
      {courses &&
        courses.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
    </ul>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};
export default React.memo(CourseList);
