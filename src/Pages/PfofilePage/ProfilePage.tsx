import React from "react";
import classes from "./style/PfofilePage.module.css";
import { useAppSelector } from "../../store/reduxHooks";
import SideBar from "../../components/SideBar/SideBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";

const Profile = () => {
  const { user } = useAppSelector((state) => state.page.data);
  return (
    <div className={classes.contentWrapper}>
      {" "}
      <div className={classes.sideBar}>
        <SideBar>
          <UserAvatar name={user.private.name} />
        </SideBar>
      </div>
    </div>
  );
};

export default Profile;
