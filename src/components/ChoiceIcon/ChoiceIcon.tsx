import React, { FC, useState } from "react";
import { Favorites } from "../../UI_Component/Icons";
import classes from "./style/ChoiceIcon.module.css";
import { CHANGE_FAVORITE_GOOD } from "../../store/slice";
import { useAppDispatch } from "../../store/reduxHooks";

const ChoiceIcon: FC<{
  favorite?: boolean;
  id: string;
}> = ({ favorite, id}) => {
  const [like, setLike] = useState<boolean>(favorite || false);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    setLike(!like);
      dispatch(CHANGE_FAVORITE_GOOD(id));
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
