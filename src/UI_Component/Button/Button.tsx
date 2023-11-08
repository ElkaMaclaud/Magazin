import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/Button.module.css";

export const Button: FC<{ style?: CSSProperties; title: ReactNode; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void }> = ({
  style,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <button style={style} className={classes.button} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title}
    </button>
  );
};

