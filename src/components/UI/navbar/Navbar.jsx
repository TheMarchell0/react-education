import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { AuthContext } from "../../../context";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar">
      <div className="navbar__item">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
        {isAuth && <CustomButton onClick={logout}>Выйти</CustomButton>}
      </div>
    </div>
  );
};

export default Navbar;
