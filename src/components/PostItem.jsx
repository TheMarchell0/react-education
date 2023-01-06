import React from "react";
import CustomButton from "./UI/button/CustomButton";

const PostItem = ({ ...data }) => {
  return (
    <li className="posts__item">
      <div className="posts__item-content">
        <div className="posts__item-head">
          <p>{data.number}.</p>
          <h2>{data.title}</h2>
        </div>
        <p>{data.body}</p>
      </div>
      <CustomButton onClick={() => data.removePostFunc(data.id)}>
        Удалить
      </CustomButton>
    </li>
  );
};

export default PostItem;
