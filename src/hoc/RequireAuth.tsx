import React, { FC, ReactNode, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppDispatch } from '../store/reduxHooks';
import { LOADING_PAGE } from '../store/slice';

const RequireAuth: FC<{children: ReactNode}> = ({children}) => {
  const token = localStorage.getItem("token");
    const location = useLocation();
    const dispatch = useAppDispatch();
    useEffect(() => {
      if (!token) {
        dispatch(LOADING_PAGE("LOGIN"))
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (!token) {
        return <Navigate to='login' state={{from: location}}/>
    }
  return <>{children}</>;
}

export default RequireAuth
