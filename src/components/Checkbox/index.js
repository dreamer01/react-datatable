import React, { useCallback } from "react";
import PropTypes from "prop-types";

function Checkbox({ value, onChange, ...props }) {
  const handleOnChange = useCallback((e) => onChange(e, value), [
    onChange,
    value,
  ]);
  return (
    <input type="checkbox" value={value} onChange={handleOnChange} {...props} />
  );
}

Checkbox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  value: "",
  onChange: () => {},
};

export default Checkbox;
