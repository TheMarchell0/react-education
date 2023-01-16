import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "../router";
import { AuthContext } from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map(({ path, element: Element, exact }) => {
        return (
          <Route key={path} path={path} element={<Element />} exact={exact} />
        );
      })}
      <Route path="/login" element={<Navigate to="/posts" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, element: Element, exact }) => {
        return (
          <Route key={path} path={path} element={<Element />} exact={exact} />
        );
      })}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
