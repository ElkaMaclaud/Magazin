import React, { FC, ReactNode } from "react";
import classes from "./style/TitleInfo.module.css";

export const TitleInfo: FC<{ icon: ReactNode; title: ReactNode }> = ({
  icon,
  title,
}) => {
  const Title: FC<{ title: ReactNode }> = ({ title }) => {
    const checkPropType = (title: ReactNode): title is string => {
        return typeof title === "string";
      };
    if (checkPropType(title)) {
      return <h1>{title}</h1>;
    }
    return <>{title}</>;
  };
  return (
    <div className={classes.titleWrapper}>
      {icon}
      <Title title={title} />
    </div>
  );
};

