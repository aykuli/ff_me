import { NavLink } from "react-router"

const Dashboard = () => {
  return (
    <div>
      <nav>
        <NavLink to="/projects" end>
          Projects
        </NavLink>
      </nav>
    </div>
  )
}

export default Dashboard
