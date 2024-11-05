import React, { CSSProperties, FC, ReactNode } from "react";
import classes from "./style/SmallCard.module.css";

export const SmallCard: FC<{children: ReactNode, style?: CSSProperties}> = ({children, style}) => {
  return <div className={classes.cardWrapper} style={style}>{children}</div>;
};
