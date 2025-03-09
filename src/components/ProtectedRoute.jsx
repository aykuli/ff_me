import { Navigate, Outlet, useLocation } from "react-router-dom"
import { createContext, useContext } from "react"
import Header from "./Header"

const contextInit = {
  token: "null456",
}
const setContext = (context) => {
  console.log("context: ", context)
  return context
}

const AuthContext = createContext([contextInit, setContext])

const ProtectedRoute = () => {
  const location = useLocation()

  const contextValue = useContext(AuthContext)
  const [value, setValue] = contextValue
  const { token } = value
  console.log("token: ", token)
  console.log("location: ", location)

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
