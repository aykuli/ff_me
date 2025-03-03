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
import axios from "axios"

const trainigList = [
  {
    id: 1,
    title: "Trainig1",
  },
  { id: 2, title: "Trainig2" },
]

const Exercises = () => {
  // get from .env file backend address
  //fetch exercises list
  //draw it
  // display absolute big pus btn
  //another page for adding exercise
  const [list, setList] = useState([])

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    console.log(url)
    axios({
      method: "get",
      url: `${url}/exercises/list`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log("response", response)
        setList(response.data)
      })
      .catch((e) => {
        console.log(e.response)
      })
      .finally(() => {
        console.log("end everything")
      })

    setList(trainigList)
  }, [])

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography level="h1">Exercises list</Typography>
        <nav aria-label="projects">
          <List>
            {list.map(({ id, titleEn }) => {
              return (
                <ListItem id={id} disablePadding>
                  <ListItemButton>
                    <ListItemText>
                      <NavLink to={`/projects/${id}`} end>
                        <Typography level="body-lg">{titleEn}</Typography>
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

export default Exercises
