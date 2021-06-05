import React from "react";
import PropTypes from "prop-types";
function CourseListItem({ course }) {
  return (
    <li className="list-group-item">
      <h5 className="mb-1">{course.title}</h5>
      <small data-testid="description">{course.description}</small>
    </li>
  );
}

CourseListItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};
export default CourseListItem;
