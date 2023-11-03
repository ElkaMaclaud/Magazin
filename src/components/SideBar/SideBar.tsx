import React, {FC, ReactNode} from 'react';
import classes from './style/SideBar.module.css';
import { personPrivateInfo } from '../../MockupData/personInfoData';
import UserAvatar from '../UserAvatar/UserAvatar';

const SideBar: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={classes.sideBar}>{children}</div>
  )
}

export default SideBar
