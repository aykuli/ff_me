import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from "./components/Dashboard"
import List from "./components/List"
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
