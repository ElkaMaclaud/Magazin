import React, {FC, ReactNode} from 'react';
import classes from './style/SideBar.module.css';

const SideBar: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={classes.sideBar}>{children}</div>
  )
}

export default SideBar
