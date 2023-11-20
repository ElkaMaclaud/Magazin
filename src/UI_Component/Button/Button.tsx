import React, { ButtonHTMLAttributes, CSSProperties, FC, ReactNode, useState } from "react";
import classes from "./style/Button.module.css";
function checkProperty(prop: Array<any> | any): prop is Array<any> {
  return Array.isArray(prop)
}
export const Button: FC<{
  title: ReactNode;
  styles?: CSSProperties | CSSProperties[];
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  disabled?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}> = ({
  title,
  styles,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
  props,
}) => {
  const [style, setStyle] = useState(checkProperty(styles) ? styles[0] : styles);
  return (
    <button
      disabled={disabled}
      style={style}
      className={classes.button}
      onClick={onClick}
      onMouseEnter={() => checkProperty(styles) && setStyle(styles[1])}
      onMouseLeave={() => checkProperty(styles) && setStyle(styles[0])}
      {...props}
    >
      {title}
    </button>
  );
};
