import { useState, useEffect, useContext } from "react"
import axios from "axios"

import { Box, List, CircularProgress } from "@mui/material"
import { Typography } from "@mui/joy"
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView"
import { TreeItem } from "@mui/x-tree-view/TreeItem"

import Item from "./Item"

import AuthContext from "../../context"
import { buildRequest } from "../../helpers/block_helpers"

const Exercises = () => {
  const { token, draftBlock, addBlockExercise, snackbar } =
    useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [openIds, setOpenIds] = useState(Array(list.length).fill(false))

  useEffect(() => {
    if (!token) {
      return
    }
    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/exercises/list`,
      data: { updatedAt: "desc" },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => setList(response.data))
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => setIsLoading(false))
  }, [token, setMsg, setType, setOpen])

  const saveBlockExercise = (exercise_id) => {
    if (!draftBlock) {
      return
    }

    addBlockExercise(exercise_id)

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/blocks/${draftBlock.id}`,
      data: buildRequest(draftBlock),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setType("success")
        setMsg("exercise was succesffully added to the block")
      })
      .catch((e) => {
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => {
        setOpen(true)
        setIsLoading(false)
      })
  }

  const handleOpenItem = (idx) => {
    setOpenIds((prev) => {
      prev[idx] = !prev[idx]
      return prev
    })
  }

  return (
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
                    <Item
                      open={openIds.includes(idx)}
                      exercise={exercise}
                      onAdd={saveBlockExercise}
                      included={draftBlock?.exercisesIds.includes(exercise.id)}
                    />
                  </TreeItem>
                </SimpleTreeView>
              )
            })}
          </List>
        </nav>
      )}
    </Box>
  )
}

export default Exercises
