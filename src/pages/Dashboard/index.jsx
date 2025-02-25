import { NavLink } from "react-router"
import { Container, Box, Paper, Grid2 as Grid } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Typography } from "@mui/joy"

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
  return (
    <Container maxWidth="md" style={{ marginTop: "60px" }}>
      <Box sx={{ width: "100%" }}>
        <Grid direction="column" container rowSpacing={5}>
          <Grid size={"100%"}>
            <Item elevation={5}>
              <NavLink to="/create" end>
                <Typography level="h3">Create</Typography>
              </NavLink>
            </Item>
          </Grid>
          <Grid size={"100%"}>
            <Item elevation={5}>
              <NavLink to="/projects" end>
                <Typography level="h3">Projects</Typography>
              </NavLink>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Dashboard
