import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Box, CircularProgress } from "@mui/material"
import { Typography, Input, IconButton } from "@mui/joy"

import AuthContext from "../context"
import ExercisesList from "../components/ExercisesList"
import { Close, Search } from "@mui/icons-material"

const initFilterBody = { updatedAt: "desc" }
const Exercises = () => {
  const { token, draftBlock, addBlockExercise, snackbar } =
    useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [suggestion, setSuggestion] = useState("")
  const [filterBody, setFilterBody] = useState(initFilterBody)

  useEffect(() => {
    if (!token) {
      return
    }
    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/exercises/list`,
      data: filterBody,
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
  }, [token, setMsg, setType, setOpen, filterBody])

  const handleDel = (exercise_id) => {
    if (!token) {
      return
    }

    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/exercises/${exercise_id}`,
      headers: {
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then(() => {
        setMsg("Successfully deleted")
        setType("success")
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
      })
      .finally(() => {
        setIsLoading(false)
        window.location.reload()
      })
  }

  const filterExercise = (e) => {
    e.preventDefault()
    console.log("hello")
    setFilterBody((prev) => {
      return { ...prev, suggestion }
    })
  }

  return (
    <>
      <Typography level="h1">Exercises list</Typography>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {isLoading ? (
          <CircularProgress size="3rem" />
        ) : (
          <>
            <Box width={"100%"} component="form" onSubmit={filterExercise}>
              <Input
                color="neutral"
                disabled={false}
                placeholder="searh"
                size="sm"
                variant="soft"
                value={suggestion}
                onChange={(e) => {
                  setSuggestion(e.target.value)
                }}
                endDecorator={
                  <>
                    <IconButton
                      size="sm"
                      onClick={() => {
                        setFilterBody(initFilterBody)
                        setSuggestion("")
                      }}
                    >
                      <Close color="disabled" />
                    </IconButton>
                    <IconButton onClick={filterExercise}>
                      <Search color="disabled" />
                    </IconButton>
                  </>
                }
              />
            </Box>
            <ExercisesList
              {...{
                list,
                onAdd: addBlockExercise,
                onDelete: handleDel,
                draftBlock,
              }}
            />
          </>
        )}
      </Box>
    </>
  )
}

export default Exercises
