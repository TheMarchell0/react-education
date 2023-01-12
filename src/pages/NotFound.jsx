import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Такая страница не существует</h1>
      <p>
        Перейти на страницу с <Link to="/posts">постами</Link>
      </p>
    </div>
  );
};

export default NotFound;
