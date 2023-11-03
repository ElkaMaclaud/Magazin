import React, { FC } from "react";
import classes from "./style/ImageGood.module.css";

export const ImageGood: FC<{ path: string, onClick: () => void }> = ({ path, onClick }) => {
  return (
    <div className={classes.imageWrapper} onClick={onClick}>
      <img className={classes.image} src={path} />
    </div>
  );
};
