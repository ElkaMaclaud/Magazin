import React, { FC, ReactNode } from 'react'
import classes from './style/InfoCard.module.css'

export const InfoCard: FC<{children: ReactNode}> = ({children}) => {
  return (
    <div className={classes.infoWrapper}>
      {children}
    </div>
  )
}

