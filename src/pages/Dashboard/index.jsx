import { NavLink } from "react-router"

const Dashboard = () => {
  return (
    <div>
      <nav>
        <NavLink to="/list" end>
          List
        </NavLink>
      </nav>
    </div>
  )
}

export default Dashboard
