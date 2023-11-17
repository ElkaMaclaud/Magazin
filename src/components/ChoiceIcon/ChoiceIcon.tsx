import React, { FC, useState } from "react";
import { Favorites } from "../../UI_Component/Icons";
import classes from "./style/ChoiceIcon.module.css";

const ChoiceIcon: FC<{
  favorite?: boolean;
  onClick: (id: string) => void;
  id: string;
}> = ({ favorite, onClick, id }) => {
  const [like, setLike] = useState<boolean>(favorite || false);
  const handleClick = (id: string) => {
    setLike(!like);
    onClick(id);
  };
  if (like) {
    return (
      <div onClick={() => handleClick(id)} className={classes.favorites}>
        <Favorites like={like} />
      </div>
    );
  }
  return (
    <div onClick={() => handleClick(id)} className={classes.favorites}>
      <Favorites />
    </div>
  );
};

export default ChoiceIcon;
