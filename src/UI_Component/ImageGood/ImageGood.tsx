import React, { CSSProperties, FC } from "react";
import classes from "./style/ImageGood.module.css";

export const ImageGood: FC<{ path: string; size?: number }> = ({ path, size }) => {
  const style: CSSProperties = {width: `${size}px`, height: `${size}px`}
  return (
    <div className={classes.imageWrapper}>
      <img className={classes.image} src={path} style={style}/>
    </div>
  );
};
