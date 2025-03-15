import { NavLink } from "react-router"
import { useLocation } from "react-router-dom"

import { Container, Box, Paper, Grid2 as Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Typography } from "@mui/joy"
import ProtectedRoute from "../../components/ProtectedRoute"
import { menuRoutes } from "../../routes"

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 100,
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}))

const Dashboard = () => {
  const location = useLocation()

  return (
    <>
      <ProtectedRoute />
      {location.pathname === "/" ? (
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Grid direction="column" container rowSpacing={5}>
              {menuRoutes.slice(1).map(({ route, title }, i) => {
                return (
                  <Item
                    key={route}
                    elevation={5}
                    sx={{ mb: i % 2 === 0 ? 1 : 5 }}
                  >
                    <NavLink to={route} end>
                      <Typography level="h3">{title}</Typography>
                    </NavLink>
                  </Item>
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
