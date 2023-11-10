import React, { CSSProperties, FC, ReactNode, useState } from "react";
import classes from "./style/Button.module.css";

export const Button: FC<{ style?: CSSProperties; title: ReactNode; onClick?: () => void; onMouseEnter?: () => void; onMouseLeave?: () => void; disabled?: boolean }> = ({
  style,
  title,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled
}) => {
  return (
    <button disabled={disabled} style={style} className={classes.button} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title}
    </button>
  );
};

