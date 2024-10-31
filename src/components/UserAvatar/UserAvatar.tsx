import React, { CSSProperties, FC, useRef } from "react";
import classes from "./style/UserAvatar.module.css";
import { Link, useLocation } from "react-router-dom";
import { Camera } from "../../UI_Component/Icons";

const UserAvatar: FC<{ name: string; style?: CSSProperties }> = ({
  name,
  style,
}) => {
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const getFirstCharName = (name: string) => {
    return name.split(" ").reduce((prevWord, word) => prevWord + word[0], "");
  };
  // const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files![0];
  // };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className={classes.userAvatarWrapper} style={style}>
      <div className={classes.round}>
        <div className={classes.roundInfo}>{getFirstCharName(name)}</div>
        <div onClick={handleCameraClick}>
          <Camera />
          <input
            type="file"
            name="fileInput"
            ref={fileInputRef}
            style={{ display: "none" }}
            //onChange={handleFileSelect}
          />
        </div>
      </div>
      <h3 className={classes.userName}>{name}</h3>
      {location.pathname === "settings" ? null : (
        <Link to="../settings" className={classes.link}>
          Изменить профиль
        </Link>
      )}
    </div>
  );
};

export default UserAvatar;
