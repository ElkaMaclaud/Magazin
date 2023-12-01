import React, { FC, ReactNode } from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const RequireAuth: FC<{children: ReactNode}> = ({children}) => {
  const token = localStorage.getItem("token");
    const location = useLocation();
    if (!token) {
        return <Navigate to='/login' state={{from: location}}/>
    }
  return <>{children}</>;
}

export default RequireAuth
