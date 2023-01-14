import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../router";

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element: Element, exact }) => {
        return (
          <Route key={path} path={path} element={<Element />} exact={exact} />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
