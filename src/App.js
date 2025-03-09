import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState, useContext, useEffect } from "react"

import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import { AuthProvider } from "./components/AuthProvider"

function App({ children }) {
  useEffect(() => {
    console.log("app")
  }, [])

  return (
    <AuthProvider>
      <ProtectedRoute>
        <Header>{children}</Header>
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default App
