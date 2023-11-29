import React, { CSSProperties, FC } from "react";
import classes from "./style/UserAvatar.module.css";
import { Link, useLocation } from "react-router-dom";

const UserAvatar: FC<{name: string; style?: CSSProperties}> = ({name, style}) => {
  const location = useLocation()
    const getFirstCharName = (name: string) => {
        return name.split(" ").reduce((prevWord, word) => prevWord + word[0], "" )
    }
  return (
    <div className={classes.userAvatarWrapper} style={style}>
      <div className={classes.round}>
        <div className={classes.roundInfo}>{getFirstCharName(name)}</div>
      </div>
      <h3 className={classes.userName}>{name}</h3>
      {location.pathname === "/settings" ? null : <Link to="../settings" className={classes.link}>Изменить профиль</Link>}
    </div>
  );
};

export default UserAvatar;
