import { createContext, useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"

export const AuthContext = createContext({
  token: null,
  setToken: null,
  draftBlock: null,
})

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const stToken = localStorage.getItem(process.env.REACT_APP_TOKEN_LS_NAME)
    if (stToken) {
      setToken(stToken)
    }
  }, [])

  useEffect(() => {
    if (token === null || token === undefined) {
      return
    }
    localStorage.setItem(process.env.REACT_APP_TOKEN_LS_NAME, token)
  }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <RouterProvider router={routes}>
        <ProtectedRoute />
      </RouterProvider>
    </AuthContext.Provider>
  )
}
export default App
