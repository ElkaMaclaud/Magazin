import React, { FC, ReactNode, CSSProperties } from "react";
import classes from "./style/CardPageFlex.module.css";

export const CardPageFlex: FC<{
  children: ReactNode[] | ReactNode;
  maxWidth?: number;
  style?: CSSProperties;
}> = ({ children, style, maxWidth }) => {
  if (Array.isArray(children)) {
    if (children.length === 3) {
      return (
        <div className={classes.wrapper}>
          <div
            style={{ maxWidth: `${maxWidth}px` }}
            className={classes.contentWrapper}
          >
            <div className={classes.contentHeader}>{children[0]}</div>
            <div className={classes.content}>
              <div className={classes.leftContent} style={style}>
                {children[1]}
              </div>
              <div className={classes.rightContent}>{children[2]}</div>
            </div>
          </div>
        </div>
      );
    }
    if (children.length < 3) {
      return (
        <div className={classes.wrapper}>
          <div
            style={{ maxWidth: `${maxWidth}px` }}
            className={classes.contentWrapper}
          >
            <div className={classes.contentHeader}>{children[0]}</div>
            <div className={classes.contentOne}>{children[1] || null}</div>
          </div>
        </div>
      );
    }
  }
  return (
    <div className={classes.wrapper}>
      <div className={classes.contentWrapperOne}>{children}</div>
    </div>
  );
};
