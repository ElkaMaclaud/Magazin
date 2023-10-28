import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Button.module.css";

export const Button: FC<{ style?: CSSProperties; title: ReactNode }> = ({
  style,
  title,
}) => {
  return (
    <button style={style} className={classes.button}>
      {title}
    </button>
  );
};

