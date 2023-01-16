import React, { useContext } from "react";
import CustomInput from "../components/UI/input/CustomInput";
import CustomButton from "../components/UI/button/CustomButton";
import { AuthContext } from "../context";

const Login = () => {
  const { setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem("auth", "true");
  };
  return (
    <div>
      <h1>Страница для логина</h1>
      <form onSubmit={login}>
        <CustomInput type="text" placeholder="Введите логин" />
        <CustomInput type="password" placeholder="Введите пароль" />
        <CustomButton>Войти</CustomButton>
      </form>
    </div>
  );
};

export default Login;
