import React, { FC, ReactNode, useEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/reduxHooks';
import { LOADING_PAGE } from '../store/slice';

const RequireAuth: FC<{ children: ReactNode }> = ({ children }) => {
  const { registered } = useAppSelector(state => state.page.data.user)
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!registered) {
      dispatch(LOADING_PAGE("LOGIN"))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!registered) {
    return <Navigate to='../login' state={{ from: location }} />
  }
  return <>{children}</>;
}

export default RequireAuth
