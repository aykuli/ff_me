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
  ListItemIcon,
} from "@mui/material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"
import { Star } from "@mui/icons-material"

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
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <List subheader={<Typography level="h1">Workouts list</Typography>}>
            {list.map(({ id, titleEn, titleRu, createdAt }) => {
              return (
                <ListItem key={id} id={id} disablePadding divider>
                  <ListItemButton>
                    <ListItemIcon>
                      <Star />
                    </ListItemIcon>
                    <ListItemText>
                      <NavLink to={`/workouts/${id}`} end>
                        <Typography level="body-lg">{titleEn}</Typography>
                        <Typography level="body-lg">{titleRu}</Typography>
                      </NavLink>
                      <Typography level="body-sm">{createdAt}</Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Container>
  )
}

export default WorkoutsList
