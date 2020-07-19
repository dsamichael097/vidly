import React from "react";
import PropTypes from "prop-types";

const SelectMenu = ({
  name,
  label,
  error,
  options,
  textProperty,
  valueProperty,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="custom-select" {...rest} name={name} id={name}>
        <option value=""></option>
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SelectMenu.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
};

SelectMenu.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default SelectMenu;
