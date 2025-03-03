import React, { useState, useEffect } from "react"
import { NavLink } from "react-router"
import {
  Container,
  Box,
  List,
  CircularProgress,
  IconButton,
} from "@mui/material"
import { Typography } from "@mui/joy"
import axios from "axios"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import Item from "./Item"
import AddIcon from "@mui/icons-material/Add"

const Exercises = () => {
  // get from .env file backend address
  //fetch exercises list
  //draw it
  // display absolute big pus btn
  //another page for adding exercise
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL
    console.log(url)
    setIsLoading(true)
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
        setIsLoading(false)
      })
  }, [])

  const onAddBtnClick = () => {
    setIsOpenAddModal(true)
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography level="h2">Exercises list</Typography>
        <IconButton
          onClick={onAddBtnClick}
          aria-label="add exercise"
          size="large"
          color="info"
          edge="end"
        >
          <AddIcon />
        </IconButton>
      </div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <nav aria-label="projects">
            <List>
              {list.map(({ id, titleEn }) => {
                return (
                  <SimpleTreeView id={id}>
                    <TreeItem itemId="1" label={titleEn}>
                      <Item />
                    </TreeItem>
                  </SimpleTreeView>
                )
              })}
            </List>
          </nav>
        )}
      </Box>
    </Container>
  )
}

export default Exercises
