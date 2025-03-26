import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import axios from "axios"

import { Typography as JoyTypography } from "@mui/joy"
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Button,
} from "@mui/material"
import { Delete } from "@mui/icons-material"

import CustomLabel from "../components/CustimTitleLabel"
import AuthContext from "../context"
import BlocksList from "../components/WorkoutBlockList"
import ListVideo from "../components/ExercisesListVideo"

const relaxExercise = {
  relax: true,
  filename: "files/relax.mp4",
  titleEn: "relax",
  titleRu: "отдых",
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Workout = () => {
  let { id } = useParams()
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const [currBlock, setCurrBlock] = useState(null)
  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)

  const [currIdx, setCurrIdx] = useState(0)
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (!token) {
      return
    }
    setIsLoading(true)

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/trainings/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setWorkout(response.data)
        let exercises = []
        response.data?.blocks?.forEach((b) => {
          exercises = [...exercises, b]
        })
        if (response.data.blocks.length) {
          setCurrBlock(response.data.blocks[0])
          setExercises(exercises)
        }
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
        setOpen(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id, token, setMsg, setType, setOpen])

  const handleDel = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/training/${id}`,

      headers: {
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setMsg("Successfully deleted")
        setType("success")
      })
      .catch((e) => {
        setMsg("Block save error: " + e)
        setType("error")
      })
      .finally(() => {
        setIsLoading(false)
        window.location.reload()
      })
  }

  const handleEdit = (lang) => {
    if (lang === "ru") {
      setIsEditRu(true)
    } else {
      setIsEditEn(true)
    }
  }

  const handleSave = (lang, value) => {
    setWorkout((prev) => {
      if (lang === "ru") {
        prev.titleRu = value
      } else {
        prev.titleEn = value
      }
      return prev
    })
    lang === "ru" ? setIsEditRu(false) : setIsEditEn(false)
    save()
  }

  const save = () => {
    if (!token) {
      return
    }

    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/trainings/${id}`,
      data: {
        titleEn: workout.titleEn,
        titleRu: workout.titleRu,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setMsg("Successfully saved")
        setType("success")
      })
      .catch((e) => {
        setType("error")
        setMsg("Block fetch error")
      })
      .finally(() => {
        setOpen(true)
        setIsLoading(false)
      })
  }

  const handleChooseBlock = () => {
    // setDraftTraining
    // navigate to blocks list page
  }

  async function startExerciseRoutine() {
    setCurrExercise(relaxExercise)
    setNextExercise(exercises[0])
    let c = 0
    while (c < 10) {
      await sleep(1000)
      setCount((prev) => prev - 1)
      c++
    }

    for (let i = 0; i < exercises.length; i++) {
      setCurrIdx(i)
      setCurrExercise(exercises[i])
      setCount(currBlock?.onTime)
      setNextExercise(i + 1 < exercises.length ? exercises[i + 1] : null)

      c = 0
      while (c < currBlock?.onTime) {
        await sleep(1000)
        setCount((prev) => prev - 1)
        c++
      }

      if (i + 1 > exercises.length) {
        // finish
        c = 0
        while (c < 10) {
          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }
      } else {
        setCurrExercise(relaxExercise)
        setCount(currBlock?.relaxTime)

        c = 0
        while (c < currBlock?.relaxTime) {
          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }
      }
    }
  }

  return (
    <>
      {token === null || !workout ? (
        <></>
      ) : (
        <>
          <JoyTypography level="h1">Workout</JoyTypography>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {isLoading && <CircularProgress size="3rem" />}
            {workout && (
              <div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  <IconButton size="small" onClick={handleDel}>
                    <Delete />
                  </IconButton>
                </div>
                <CustomLabel
                  lang="en"
                  isEdit={isEditEn}
                  title={workout.titleEn}
                  onEdit={() => handleEdit("en")}
                  onSave={(v) => handleSave("en", v)}
                />
                <CustomLabel
                  lang="ru"
                  isEdit={isEditRu}
                  title={workout.titleRu}
                  onEdit={() => handleEdit("ru")}
                  onSave={(v) => handleSave("ru", v)}
                />
                {exercises.length && (
                  <ListVideo
                    {...{
                      currExercise,
                      currIdx,
                      nextExercise,
                      count,
                      onPlay: startExerciseRoutine,
                    }}
                  />
                )}
                <div>
                  <Typography variant="h5">Exercises</Typography>
                </div>

                {!workout.blocks?.length && (
                  <div>
                    <p>Please, add some blocks.</p>
                    <Button onClick={handleChooseBlock}>
                      Go to blocks page
                    </Button>
                  </div>
                )}

                {workout.blocks?.length !== 0 && (
                  <BlocksList blocks={workout.blocks} countable />
                )}
              </div>
            )}
          </Box>
        </>
      )}
    </>
  )
}

export default Workout
