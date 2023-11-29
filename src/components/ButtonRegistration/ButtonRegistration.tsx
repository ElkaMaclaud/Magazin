import React, { FC, ReactNode } from "react";
import { Button } from "../../UI_Component";

const ButtonRegistration: FC<{
  children: ReactNode;
  backgroundColor?: string;
  backgroundColorHover?: string;
  handler?: (...args: any) => any;
}> = ({ children, backgroundColor, backgroundColorHover, handler }) => {
  const styles = {
    height: "50px",
    color: "#fff",
    width: "100%",
    backgroundColor: `${backgroundColor}`,
    transition: ".3s linear",
  };
  const stylesHover = {
    height: "50px",
    color: "#fff",
    width: "100%",
    backgroundColor: `${backgroundColorHover}`,
  };
  return (
    <Button onClick={handler}styles={[styles, stylesHover]}>{children}</Button>
  );
};

export default ButtonRegistration;
