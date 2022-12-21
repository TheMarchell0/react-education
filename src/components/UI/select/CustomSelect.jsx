import React from "react";
import classes from "./CustomSelect.module.css";

function CustomSelect({ options, selectedValue, changeValue }) {
  return (
    <select
      name="select"
      className={classes.customSelect}
      value={selectedValue}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="default">По умолчанию</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default CustomSelect;
