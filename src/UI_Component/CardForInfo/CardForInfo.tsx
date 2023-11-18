import React, {ReactNode, FC} from "react";
import classes from "./style/CardForInfo.module.css";

export const CardForInfo: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={classes.cardWrapper}>
      {children}
    </div>
  );
};
