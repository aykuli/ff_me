import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Box, CircularProgress } from "@mui/material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"
import { buildRequest } from "../helpers/block_helpers"
import ExercisesList from "../components/ExercisesList"

const Exercises = () => {
  const { token, draftBlock, addBlockExercise, snackbar } =
    useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <>
      <Typography level="h1">Exercises list</Typography>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <ExercisesList {...{ list, onSave: saveBlockExercise, draftBlock }} />
        )}
      </Box>
    </>
  )
}

export default Exercises
