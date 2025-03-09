import { NavLink } from "react-router"
import { useLocation } from "react-router-dom"

import { Container, Box, Paper, Grid2 as Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Typography } from "@mui/joy"
import ProtectedRoute from "../../components/ProtectedRoute"

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

const links = [
  { route: "/exercises/create", title: "Add Exercise" },
  { route: "/exercises", title: "Exercises" },
  { route: "/projects/create", title: "Create project" },
  { route: "/projects", title: "Projects" },
]

const Dashboard = () => {
  const location = useLocation()
  console.log(location)

  return (
    <>
      <ProtectedRoute />
      {location.pathname === "/" ? (
        <Container maxWidth="md" style={{ marginTop: "60px" }}>
          <Box sx={{ width: "100%" }}>
            <Grid direction="column" container rowSpacing={5}>
              {links.map(({ route, title }) => {
                return (
                  <Grid size={"100%"} id={route}>
                    <Item elevation={5}>
                      <NavLink to={route} end>
                        <Typography level="h3">{title}</Typography>
                      </NavLink>
                    </Item>
                  </Grid>
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
