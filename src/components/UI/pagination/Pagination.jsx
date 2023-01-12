import React from "react";
import { usePagination } from "../../hooks/usePagination";

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = usePagination(totalPages); // Массив с пагинацией, который будет преобразован в вёрстку;
  return (
    <div className={"pagination"}>
      {pagesArray.map((item) => (
        <span
          key={item}
          onClick={() => changePage(item)}
          className={
            page === item
              ? "pagination__item pagination__item_active"
              : "pagination__item"
          }
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
