import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Training from "./pages/Training"
import List from "./pages/Projects"
import "./App.css"
import Exercises from "./pages/Exercises"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
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
