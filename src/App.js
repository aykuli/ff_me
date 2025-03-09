import { createContext, useState } from "react"
import { RouterProvider } from "react-router-dom"

import "./index.css"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"

export const AuthContext = createContext({ token: null, setToken: null })

const App = () => {
  const [token, setToken] = useState(null)

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <RouterProvider router={routes}>
        <ProtectedRoute />
      </RouterProvider>
    </AuthContext.Provider>
  )
}
export default App
