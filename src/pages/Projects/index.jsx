import React, { useState, useEffect } from "react"
import { NavLink } from "react-router"
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import { Typography } from "@mui/joy"

const trainigList = [
  {
    id: 1,
    title: "Trainig1",
  },
  { id: 2, title: "Trainig2" },
]

const Projects = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    setList(trainigList)
  }, [])

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography level="h1">Projects list</Typography>
        <nav aria-label="projects">
          <List>
            {list.map(({ id, title }) => {
              return (
                <ListItem id={id} disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <NavLink to={`/projects/${id}`} end>
                        <Typography level="body-lg">{title}</Typography>
                      </NavLink>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </nav>
      </Box>
    </Container>
  )
}

export default Projects
