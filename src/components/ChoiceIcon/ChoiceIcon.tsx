import React, { FC, useState } from "react";
import { Favorites } from "../../UI_Component/Icons";
import classes from "./style/ChoiceIcon.module.css";

const ChoiceIcon: FC<{
  favorite?: boolean;
  onClick: () => void;
  id: string;
}> = ({ favorite, onClick}) => {
  const [like, setLike] = useState<boolean>(favorite || false);
  const handleClick = () => {
    setLike(!like);
    onClick();
  };
  if (like) {
    return (
      <div onClick={() => handleClick()} className={classes.favorites}>
        <Favorites like />
      </div>
    );
  }
  return (
    <div onClick={() => handleClick()} className={classes.favorites}>
      <Favorites />
    </div>
  );
};

export default ChoiceIcon;
