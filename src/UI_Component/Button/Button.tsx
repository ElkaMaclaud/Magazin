import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Button.module.css";

export const Button: FC<{ style?: CSSProperties; title: ReactNode; onClick?: () => void }> = ({
  style,
  title,
  onClick,
}) => {
  return (
    <button style={style} className={classes.button} onClick={onClick}>
      {title}
    </button>
  );
};

