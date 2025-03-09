import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const contextInit = {
  token: null,
}
const setContext = (context) => {
  console.log("concosle from App.js")
  console.log("context: ", context)
  return context
}

export const AuthContext = createContext([contextInit, setContext])

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider")
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const login = (userData) => {
    setUser(userData)
    navigate("/")
  }

  const logout = () => {
    setUser(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (e) => {
  console.log("useAuth in AuthProvider.js")
  console.log(e)
  useContext(AuthContext)
}
