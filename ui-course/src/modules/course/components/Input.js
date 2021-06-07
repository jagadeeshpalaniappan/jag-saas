import React, { useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

function Input({ onChange, debounceTime, placeholder }) {
  const delayedChange = useCallback(
    () => debounce((q) => onChange(q), debounceTime),
    [onChange, debounceTime]
  );
  const handleChange = (e) => {
    if (debounceTime) delayedChange(e.target.value);
    else onChange(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        placeholder={placeholder}
        className="form-control my-2"
      />
    </>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
};
export default Input;
