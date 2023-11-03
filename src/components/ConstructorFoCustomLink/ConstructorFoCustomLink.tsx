import React, { FC, ReactNode } from "react";
import CustomLink from "../CustomLink/CustomLink";
import classes from "./style/ConstructorFoCustomLink.module.css";

const ConstructorFoCustomLink: FC<{
  firsChild: ReactNode;
  secondChild: ReactNode;
  text: string;
}> = ({ firsChild, secondChild, text }) => {
  return (
    <CustomLink
      to="catalog"
      activeChildren={
        <div className={classes.burgerMenu}>
          {secondChild}
          {text}
        </div>
      }
    >
      <div className={classes.burgerMenu}>
        {firsChild}
        {text}
      </div>
    </CustomLink>
  );
};

export default ConstructorFoCustomLink;
