import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
  return localStorage.getItem('user_id') ? <Outlet/> : <Navigate to='/'/>
}
