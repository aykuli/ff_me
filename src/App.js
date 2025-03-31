import { useEffect, useState, useLayoutEffect, useCallback } from "react"
import { RouterProvider } from "react-router-dom"
import CssBaseline from "@mui/material/CssBaseline"
import axios from "axios"

import "./index.css"
import routes from "./routes"
import AuthContext from "./context"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  const [token, setToken] = useState(null)
  const [draftBlock, setDraftBlock] = useState(null)
  const [draftWorkout, setDraftWorkout] = useState(null)

  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  const addBlockExercise = (exercise) => {
    setDraftBlock((prev) => {
      return {
        ...prev,
        exercises: prev.exercises?.length
          ? [...prev.exercises, exercise]
          : [exercise],
      }
    })
  }

  const removeBlockExercise = (exercise) => {
    setDraftBlock((prev) => {
      let exercises = []
      if (prev.exercises?.length) {
        exercises = prev.exercises.filter((e) => e.id !== exercise.id)
      }
      return { ...prev, exercises }
    })
  }

  const mutateExerciseInBlock = (exercise, action, block = null) => {
    if (!draftBlock && !block) {
      return
    }
    const id = block ? block.id : draftBlock.id
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}/${action}/exercise/${exercise.id}`,
      data: { side: exercise.side },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setSbType("success")
        setSbMsg(`exercise was succesffully ${action}ed to the block`)
        if (!block) {
          if (action === "add") {
            addBlockExercise(exercise)
          } else {
            removeBlockExercise(exercise)
          }
        }
      })
      .catch((e) => {
        setSbType("error")
        setSbMsg(e.response.data)
      })
      .finally(() => {
        setOpenSb(true)
      })
  }

  const mutateDraftBlock = (block) => {
    if (!block) {
      setDraftBlock(null)
      localStorage.clear(process.env.REACT_APP_DRAFT_ID_LS_NAME)
      return
    }

    localStorage.setItem(process.env.REACT_APP_DRAFT_ID_LS_NAME, block.id)
    setDraftBlock(block)
  }

  const addWorkoutBlock = (block) => {
    setDraftWorkout((prev) => {
      return {
        ...prev,
        blocks: prev.blocks?.length ? [...prev.blocks, block] : [block],
      }
    })
  }

  const removeWorkoutBlock = (block) => {
    setDraftBlock((prev) => {
      let blocks = []
      if (prev.blocks?.length) {
        blocks = prev.blocks.filter((e) => e.id !== block.id)
      }
      return { ...prev, blocks }
    })
  }

  const mutateBlockInWorkout = (block, action) => {
    if (!draftWorkout) {
      return
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/trainings/${draftWorkout.id}/${action}/block/${block.id}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setSbType("success")
        setSbMsg(
          `Block with id=${block.id} was succesffully ${action}ed to the workout`
        )

        if (action === "add") {
          addWorkoutBlock(block)
        } else {
          removeWorkoutBlock(block)
        }
      })
      .catch((e) => {
        setSbType("error")
        setSbMsg(e.response.data)
      })
      .finally(() => {
        setOpenSb(true)
      })
  }

  const mutateDraftWorkout = (workout) => {
    if (!workout) {
      setDraftWorkout(null)
      localStorage.clear(process.env.REACT_APP_WORKOUT_ID_LS_NAME)
      return
    }

    localStorage.setItem(process.env.REACT_APP_WORKOUT_ID_LS_NAME, workout.id)
    setDraftWorkout(workout)
  }

  const fetchDraft = useCallback(
    (block_id) => {
      if (draftBlock || !token) {
        return
      }

      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/blocks/${block_id}`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: token,
        },
      })
        .then((response) => {
          setDraftBlock(response.data)
        })
        .catch((e) => {
          setOpenSb(true)
          setSbType("error")
          setSbMsg("Block fetch error")
        })
    },
    [token, draftBlock]
  )

  useLayoutEffect(() => {
    const stToken = localStorage.getItem(process.env.REACT_APP_TOKEN_LS_NAME)
    if (stToken) {
      setToken(stToken)
    }
    const draftId = localStorage.getItem(process.env.REACT_APP_DRAFT_ID_LS_NAME)
    if (draftId) {
      fetchDraft(draftId)
    }
  }, [fetchDraft])

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
          setDraftBlock: mutateDraftBlock,
          addBlockExercise: (exer) => mutateExerciseInBlock(exer, "add"),
          deleteBlockExercise: (exer, block = null) => {
            mutateExerciseInBlock(exer, "remove", block)
          },
          draftWorkout,
          setDraftWorkout: mutateDraftWorkout,
          addWorkoutBlock: (block) => mutateBlockInWorkout(block, "add"),
          deleteWorkoutBlock: (block) => mutateBlockInWorkout(block, "remove"),
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
