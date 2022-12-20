import React from "react";
import classes from "./CustomSelect.module.css";

function CustomSelect({ options, defaultValue, selectedValue, changeValue }) {
  return (
    <select
      name="select"
      className={classes.customSelect}
      value={selectedValue}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="default">{defaultValue}</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default CustomSelect;
