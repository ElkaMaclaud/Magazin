import React, { CSSProperties, FC } from "react";
import classes from "./style/UserAvatar.module.css";

const UserAvatar: FC<{name: string; style?: CSSProperties}> = ({name, style}) => {
    const getFirstCharName = (name: string) => {
        return name.split(" ").reduce((prevWord, word) => prevWord + word[0], "" )
    }
  return (
    <div className={classes.userAvatarWrapper} style={style}>
      <div className={classes.round}>
        <div  className={classes.roundInfo}>{getFirstCharName(name)}</div>
      </div>
      <h3>{name}</h3>
      <a>Изменить профиль</a>
    </div>
  );
};

export default UserAvatar;
