import React from "react";
import PropTypes from "prop-types";
const LoadingAlert = ({ text }) => (
  <div className="alert alert-primary" role="alert" data-testid="loading">
    {text}
  </div>
);

LoadingAlert.propTypes = {
  text: PropTypes.string.isRequired,
};
export default LoadingAlert;
