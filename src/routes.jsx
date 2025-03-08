import Exercises from "./pages/Exercises"
import AddExercise from "./pages/AddExercise"
import Training from "./pages/Training"
import List from "./pages/Projects"
import Header from "./components/Header"

const routes = [
  {
    route: "/exercises",
    title: "Exercises",
    component: (
      <Header pageName={"Exercises"}>
        <Exercises />
      </Header>
    ),
    children: [
      {
        route: "create",
        title: "Add Exercise",
        component: (
          <Header pageName={"Add Exercise"}>
            <AddExercise />
          </Header>
        ),
      },
    ],
  },
  {
    route: "/projects",
    title: "Projects",
    component: (
      <Header pageName={"Projects"}>
        <List />,
      </Header>
    ),
    children: [
      {
        route: ":id",
        title: "Project",
        component: (
          <Header pageName={"Project"}>
            <Training />
          </Header>
        ),
      },
    ],
  },
]

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
export default routes
export { menuRoutes }
