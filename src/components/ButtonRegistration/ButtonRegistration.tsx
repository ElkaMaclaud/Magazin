import React, { FC, ReactNode } from "react";
import { Button } from "../../UI_Component";

const ButtonRegistration: FC<{
  title: ReactNode;
  backgroundColor?: string;
  backgroundColorHover?: string;
  handler?: (...args: any) => any;
}> = ({ title, backgroundColor, backgroundColorHover, handler }) => {
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
    <Button onClick={handler} title={title} styles={[styles, stylesHover]}></Button>
  );
};

export default ButtonRegistration;
