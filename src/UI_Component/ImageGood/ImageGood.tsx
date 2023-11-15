import React, { CSSProperties, FC } from "react";
import classes from "./style/ImageGood.module.css";
import { SliderMouseMove } from "../SliderMouseMove/SliderMouseMove";

export const ImageGood: FC<{ path: string | Array<string>; size?: number }> = ({
  path,
  size,
}) => {
  const style: CSSProperties = { width: `${size}px`, height: `${size}px` };
  if (Array.isArray(path)) {
    return <SliderMouseMove images={path} size={size}/>;
  }
  return (
    <div className={classes.imageWrapper}>
      <img className={classes.image} src={path} style={style} alt="" />
    </div>
  );
};
