import React from "react";
import CustomInput from "./UI/input/CustomInput";
import CustomSelect from "./UI/select/CustomSelect";

function Filter({ filter, setFilter }) {
  return (
    <>
      <CustomSelect
        value={filter.sort}
        changeValue={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        options={[
          { value: "title", name: "По названию" },
          { value: "description", name: "По описанию" },
        ]}
      />
      <CustomInput
        placeholder="Поиск..."
        value={filter.searchQuery}
        onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
      />
    </>
  );
}

export default Filter;
