import React from 'react'
import { Navigate } from 'react-router'

function ProtectedRoutes({children}) {
  const user = JSON.parse(localStorage.getItem('user'))
  const isLoggedIn = user ? user.isLoggedIn : false;
    return isLoggedIn ? children : <Navigate to='/login' replace />

 
}

export default ProtectedRoutes