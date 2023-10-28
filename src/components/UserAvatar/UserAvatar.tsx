import React, { FC } from "react";
import classes from "./style/UserAvatar.module.css";

const UserAvatar: FC<{name: string}> = ({name}) => {
    const getFirstCharName = (name: string) => {
        return name.split(" ").reduce((currentWord, word) => currentWord + word[0], "" )
    }
  return (
    <div className={classes.userAvatarWrapper}>
      <div className={classes.round}>
        <div  className={classes.roundInfo}>{getFirstCharName(name)}</div>
      </div>
      <h3>{name}</h3>
      <a>Изменить профиль</a>
    </div>
  );
};

export default UserAvatar;
