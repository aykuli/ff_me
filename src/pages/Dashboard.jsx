import { NavLink } from "react-router"
import { useLocation } from "react-router-dom"

import {
  Container,
  Box,
  Grid2 as Grid,
  Typography,
  useTheme,
} from "@mui/material"

import ProtectedRoute from "../components/ProtectedRoute"
import DraftBlocksList from "../components/DrafBlocksList"
import { menuRoutes } from "../routes"

const Dashboard = () => {
  const location = useLocation()
  const theme = useTheme()

  return (
    <>
      <ProtectedRoute />
      {location.pathname === "/" ? (
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <DraftBlocksList />
          <Box sx={{ width: "100%", mt: 2 }}>
            <Grid direction="column" container rowSpacing={2}>
              {menuRoutes.slice(1).map(({ route, title }, i) => {
                return (
                  <NavLink
                    key={route}
                    to={route}
                    end
                    style={{ color: theme.palette.primary.dark }}
                  >
                    <Typography variant="h5" component={"p"}>
                      {title}
                    </Typography>
                  </NavLink>
                )
              })}
            </Grid>
          </Box>
        </Container>
      ) : null}
    </>
  )
}

export default Dashboard
