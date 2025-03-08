import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import routes from "./routes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {routes.map(({ route, component, children }) => {
          return (
            <Route id={route} path={route}>
              <Route index element={component} />
              {children.map((ch) => {
                return (
                  <Route id={ch.route} path={ch.route} element={ch.component} />
                )
              })}
            </Route>
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
