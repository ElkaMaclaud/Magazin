import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import Profile from '../../components/Pfofile/Profile'
import classes from './style/Content.module.css'

const Content = () => {
  return (
    <div className={classes.contentWrapper}>
      <SideBar />
      <Profile />
    </div>
  )
}

export default Content
