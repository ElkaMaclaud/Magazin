import React, { FC, ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppSelector } from '../store/reduxHooks';

const RequireAuth: FC<{children: ReactNode}> = ({children}) => {
    const {token} = useAppSelector(state => state.page)
    const location = useLocation();
    if (!token) {
        return <Navigate to='/login' state={{from: location}}/>
    }
  return <>{children}</>;
}

export default RequireAuth
