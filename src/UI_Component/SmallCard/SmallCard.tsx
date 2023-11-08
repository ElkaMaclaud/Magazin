import React, { FC, ReactNode } from "react";
import classes from "./style/SmallCard.module.css";

export const SmallCard: FC<{children: ReactNode}> = ({children}) => {
  return <div className={classes.cardWrapper}>{children}</div>;
};
