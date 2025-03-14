import { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthContext, { initContext } from "./context"

const App = () => {
  const [token, setToken] = useState(null)
  // const [draftBlock, setDraftBlock] = useState(null)

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
    <AuthContext.Provider value={{ ...initContext, token, setToken }}>
      <RouterProvider router={routes}>
        <ProtectedRoute />
      </RouterProvider>
    </AuthContext.Provider>
  )
}
export default App
