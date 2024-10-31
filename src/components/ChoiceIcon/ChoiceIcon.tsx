import React, { FC, useEffect, useState } from "react";
import { Favorites } from "../../UI_Component/Icons";
import classes from "./style/ChoiceIcon.module.css";
import { CHANGE_FAVORITE_GOOD, CHANGE_FAVORITE_GOOD__NO_AUTO } from "../../store/slice";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

const ChoiceIcon: FC<{
  favorite?: boolean;
  id: string;
}> = ({ favorite, id }) => {
  const { token } = useAppSelector(state => state.page)
  const [like, setLike] = useState<boolean>(favorite || false);
  useEffect(() => {
    setLike(favorite || false)
  }, [favorite])
  const dispatch = useAppDispatch();
  const handleClick = () => {
    setLike(!like);
    if (token) {
      dispatch(CHANGE_FAVORITE_GOOD(id));
    } else {
      dispatch(CHANGE_FAVORITE_GOOD__NO_AUTO(id));
    }
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
