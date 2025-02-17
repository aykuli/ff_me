import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import List from "./pages/List"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="list" element={<List />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
