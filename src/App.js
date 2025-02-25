import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Training from "./pages/Training"
import List from "./pages/List"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="projects">
          <Route index element={<List />} />
          <Route path=":id" element={<Training />} />
          {/* <Route path=":pid/edit" element={<EditProject />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
