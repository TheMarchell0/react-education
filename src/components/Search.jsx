import React from "react";
import CustomInput from "./UI/input/CustomInput";
import CustomButton from "./UI/button/CustomButton";
function SearchBlock({ searchValue, searchFunction }) {
  return (
    <>
      <CustomInput
        placeholder="Поиск..."
        value={searchValue}
        onChange={(e) => searchFunction(e.target.value)}
      />
      <CustomButton>Искать</CustomButton>
    </>
  );
}

export default SearchBlock;
