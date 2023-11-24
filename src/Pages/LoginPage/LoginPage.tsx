import React, { CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import { Login } from "../../components/Login/Login";
import { CardPageFlex } from "../../UI_Component";
const style:CSSProperties = {width: "900px", margin: "auto", backgroundColor: "transparent"}
 const LoginPage = () => {
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/";

  return (
    <CardPageFlex style={style}><Login fromPage={fromPage} /></CardPageFlex>
  );
};
export default LoginPage;