import React from "react";
import PropTypes from "prop-types";

const ErrorAlert = ({ text }) => (
  <div className="alert alert-danger" role="alert" data-testid="error">
    {text}
  </div>
);

ErrorAlert.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorAlert;
