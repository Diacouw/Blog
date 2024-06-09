import React from 'react'
import {Navigate , Outlet } from 'react-router-dom'

export default function AuthCheck() {
  return localStorage.getItem('user_id') ? <Navigate to='/'/> : <Outlet/>
}
