import { createBrowserRouter } from "react-router-dom"

import Exercises from "./pages/Exercises"
import CreateExercise from "./pages/CreateExercise"
import Workout from "./pages/Workout"
import WorkoutsList from "./pages/WorkoutsList"
import CreateWorkout from "./pages/CreateWorkout"
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
        path: "/workouts",
        element: <WorkoutsList />,
      },
      {
        path: "/workouts/create",
        element: <CreateWorkout />,
      },
      {
        path: "/workouts/:id",
        element: <Workout />,
      },
    ],
  },
])
export default routes

const menuRoutes = [
  { route: "/", title: "Dashboard" },
  { route: "/exercises", title: "Exercises" },
  { route: "/exercises/create", title: "Create exercise" },
  { route: "/blocks", title: "Blocks" },
  { route: "/blocks/create", title: "Create block" },
  { route: "/workouts", title: "Workouts" },
  { route: "/workouts/create", title: "Create workout" },
]
export { menuRoutes }
