import React, { FC, ReactNode } from 'react'
import classes from './style/InfoCard.module.css'

export const InfoCard: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={classes.infoWrapper} style={{margin: "0"}}>
      {children}
    </div>
  )
}

