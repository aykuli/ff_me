import { createBrowserRouter } from "react-router-dom"

import Exercises from "./pages/Exercises"
import AddExercise from "./pages/AddExercise"
import Training from "./pages/Training"
import List from "./pages/Projects"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/vragneproidet",
    element: <Register />,
  },
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "exercises",
        element: <Exercises />,
      },
      {
        path: "exercises/create",
        index: false,
        element: <AddExercise />,
      },
      {
        path: "/projects",
        element: <List />,
      },
      {
        path: "/projects/:id",
        element: <Training />,
      },
    ],
  },
])
export default routes

const menuRoutes = [
  {
    route: "/",
    title: "Dashboard",
  },
  {
    route: "/exercises",
    title: "Exercises",
  },
  {
    route: "/exercises/create",
    title: "Add Exercise",
  },
  {
    route: "/projects",
    title: "Projects",
  },
]
export { menuRoutes }
