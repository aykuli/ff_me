import { useEffect, useState, useLayoutEffect } from "react"
import { RouterProvider } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import axios from "axios"

import "./index.css"
import routes from "./routes"
import AuthContext from "./context"
import ProtectedRoute from "./components/ProtectedRoute"
import { buildRequest } from "./helpers/block_helpers"

const App = () => {
  const [token, setToken] = useState(null)
  const [draftBlock, setDraftBlock] = useState(null)

  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  const addBlockExercise = (exercise) => {
    mutateExerciseInBlock(exercise, "add")

    setDraftBlock((prev) => {
      return { ...prev, exercises: [...prev.exercises, exercise] }
    })
  }

  const deleteBlockExercise = (exercise) => {
    mutateExerciseInBlock(exercise, "remove")

    setDraftBlock((prev) => {
      return {
        ...prev,
        exercises: prev.exercises.filter((e) => e.id !== exercise.id),
      }
    })
  }

  const mutateExerciseInBlock = (exercise, action) => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/blocks/${draftBlock.id}/${action}/exercise/${exercise.id}`,
      data: buildRequest(draftBlock),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setSbType("success")
        sbMsg("exercise was succesffully added to the block")
      })
      .catch((e) => {
        setSbType("error")
        sbMsg("Server exercises fetch error")
      })
      .finally(() => {
        setOpenSb(true)
      })
  }

  useLayoutEffect(() => {
    const stToken = localStorage.getItem(process.env.REACT_APP_TOKEN_LS_NAME)
    if (stToken) {
      setToken(stToken)
    }
  }, [])

  useEffect(() => {
    if (token === null || token === undefined) {
      return
    }
    localStorage.setItem(process.env.REACT_APP_TOKEN_LS_NAME, token)
  }, [token])

  return (
    <>
      <CssBaseline />
      <AuthContext.Provider
        value={{
          token,
          setToken,
          draftBlock,
          setDraftBlock,
          addBlockExercise,
          deleteBlockExercise,
          snackbar: {
            open: openSnackbar,
            setOpen: setOpenSb,
            msg: sbMsg,
            setMsg: setSbMsg,
            type: sbType,
            setType: setSbType,
          },
        }}
      >
        <RouterProvider router={routes}>
          <ProtectedRoute />
        </RouterProvider>
      </AuthContext.Provider>
    </>
  )
}
export default App
