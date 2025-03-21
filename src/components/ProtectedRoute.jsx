import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useContext, useEffect, useLayoutEffect, useState } from "react"

import AuthContext from "../context"

import Header from "./Header"
import { CircularProgress } from "@mui/material"

const ProtectedRoute = () => {
  const { token } = useContext(AuthContext)
  const [isLoading, setTIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      return
    }

    setTIsLoading(false)
  }, [token])

  return (
    <>
      {isLoading && <CircularProgress size="large" />}
      {!isLoading && token === null ? (
        <Navigate to="/login" />
      ) : (
        <Header>
          <Outlet />
        </Header>
      )}
    </>
  )
}
export default ProtectedRoute
