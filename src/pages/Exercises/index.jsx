import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
import { Add, Close } from "@mui/icons-material"

const Exercises = () => {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openId, setOpenId] = useState(undefined)
  const [error, setError] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/exercises/list`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => setList(response.data))
      .catch((e) => setError("Server exercises fetch error"))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      {error ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="danger" level="p">
            {error}
          </Typography>
          <IconButton
            onClick={() => setError(undefined)}
            size="small"
            color="error"
            edge="end"
          >
            <Close />
          </IconButton>
        </div>
      ) : null}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography level="h3">Exercises list</Typography>

        <IconButton
          onClick={() => navigate("/exercises/create")}
          aria-label="add exercise"
          size="large"
          color="info"
          edge="end"
        >
          <Add />
        </IconButton>
      </div>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <nav aria-label="projects">
            <List>
              {list.map(({ id, titleEn }, idx) => {
                return (
                  <SimpleTreeView id={id} onClick={() => setOpenId(id)}>
                    <TreeItem itemId="1" label={titleEn}>
                      <Item open={openId === id} />
                    </TreeItem>
                  </SimpleTreeView>
                )
              })}
            </List>
          </nav>
        )}
      </Box>
    </>
  )
}

export default Exercises
