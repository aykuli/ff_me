import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useContext } from "react"

import AuthContext from "../context"

import Header from "./Header"

const ProtectedRoute = () => {
  const location = useLocation()
  const { token } = useContext(AuthContext)

  if (token !== null && location.pathname === "/login") {
    return <Navigate to="/" />
  }

  return token === null ? (
    <Navigate to="/login" />
  ) : (
    <Header>
      <Outlet />
    </Header>
  )
}

export default ProtectedRoute
