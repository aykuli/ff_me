import React, { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router"
import axios from "axios"

import {
  Container,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"

const WorkoutsList = () => {
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState([])

  useEffect(() => {
    if (!token) {
      return
    }
    setIsLoading(true)

    axios({
      method: "POST",
      data: {},
      url: `${process.env.REACT_APP_API_URL}/trainings/list`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setList(response.data)
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
        setOpen(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token, setMsg, setType, setOpen])

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Typography level="h1">Workouts list</Typography>
        <nav aria-label="projects">
          {isLoading ? (
            <CircularProgress size="3rem" />
          ) : (
            <List>
              {list.map(({ id, titleEn, titleRu }) => {
                return (
                  <ListItem key={id} id={id} disablePadding>
                    <ListItemButton>
                      <ListItemText>
                        <NavLink to={`/workouts/${id}`} end>
                          <Typography level="body-lg">{titleEn}</Typography>
                          <Typography level="body-lg">{titleRu}</Typography>
                        </NavLink>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              })}
            </List>
          )}
        </nav>
      </Box>
    </Container>
  )
}

export default WorkoutsList
