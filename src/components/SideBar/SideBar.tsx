import React from 'react';
import classes from './style/SideBar.module.css';
import { personPrivateInfo } from '../../MockupData/personInfoData';
import UserAvatar from '../UserAvatar/UserAvatar';

const SideBar = () => {
  return (
    <div className={classes.sideBar}>
      <UserAvatar name={personPrivateInfo["ФИО"]}/>
    </div>
  )
}

export default SideBar
