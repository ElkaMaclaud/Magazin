import React, { ButtonHTMLAttributes, CSSProperties, FC, ReactNode, useState } from "react";
import classes from "./style/Button.module.css";
function checkProperty(prop: Array<any> | any): prop is Array<any> {
  return Array.isArray(prop)
}
export const Button: FC<{
  children: ReactNode;
  styles?: CSSProperties | CSSProperties[];
  onClick?: () => void;
  disabled?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}> = ({
  children,
  styles,
  onClick,
  disabled,
  props,
}) => {
  const [style, setStyle] = useState(checkProperty(styles) ?  disabled ? styles[2] : styles[0] : styles);
  return (
    <button
      disabled={disabled}
      style={style}
      className={classes.button}
      onClick={onClick}
      onMouseEnter={() => !disabled && checkProperty(styles) && setStyle(styles[1])}
      onMouseLeave={() => !disabled && checkProperty(styles) && setStyle(styles[0])}
      {...props}
    >
      {children}
    </button>
  );
};
