import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./components/AuthProvider"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/vragneproidet" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {routes.map(({ route, component, children }) => {
              return (
                <Route id={route} path={route}>
                  <Route index element={component} />
                  {children.map((ch) => {
                    return (
                      <Route
                        id={ch.route}
                        path={ch.route}
                        element={ch.component}
                      />
                    )
                  })}
                </Route>
              )
            })}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
