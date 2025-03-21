import { createBrowserRouter } from "react-router-dom"

import Exercises from "./pages/Exercises"
import CreateExercise from "./pages/CreateExercise"
import Training from "./pages/Training"
import List from "./pages/Projects"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import CreateBlock from "./pages/CreateBlock"
import BlocksList from "./pages/BlocksList"
import Block from "./pages/Block"

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
        path: "exercises/create",
        index: false,
        element: <CreateExercise />,
      },
      {
        path: "exercises",
        element: <Exercises />,
      },
      {
        path: "blocks/create",
        index: false,
        element: <CreateBlock />,
      },
      {
        path: "blocks/:id",
        index: false,
        element: <Block />,
      },
      {
        path: "blocks",
        index: false,
        element: <BlocksList />,
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
  { route: "/", title: "Dashboard" },
  { route: "/exercises", title: "Exercises" },
  { route: "/exercises/create", title: "Create exercise" },
  { route: "/blocks/", title: "Block" },
  { route: "/blocks", title: "Blocks" },
  { route: "/blocks/create", title: "Create block" },
  { route: "/projects", title: "Projects" },
  { route: "/projects/create", title: "Create project" },
]
export { menuRoutes }
