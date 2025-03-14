import React, { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Box, List, CircularProgress, IconButton } from "@mui/material"
import { Typography } from "@mui/joy"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"
import { Close } from "@mui/icons-material"

import Item from "./Item"
import { AuthContext } from "../../App"

const Exercises = () => {
  const { token } = useContext(AuthContext)

  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openIds, setOpenIds] = useState(Array(list.length).fill(false))
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setIsLoading(true)
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/exercises/list`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => setList(response.data))
      .catch((e) => setError("Server exercises fetch error"))
      .finally(() => setIsLoading(false))
  }, [token])

  const handleOpenItem = (idx) => {
    setOpenIds((prev) => {
      prev[idx] = !prev[idx]
      return prev
    })
  }

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

      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <nav aria-label="projects">
            <List>
              {list.map((exercise, idx) => {
                return (
                  <SimpleTreeView
                    id={exercise.id}
                    onClick={(e) => handleOpenItem(idx)}
                  >
                    <TreeItem
                      itemId={idx}
                      label={<Typography>{exercise.titleRu}</Typography>}
                    >
                      <Item open={openIds.includes(idx)} exercise={exercise} />
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
