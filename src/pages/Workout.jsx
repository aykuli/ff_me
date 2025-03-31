import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { Typography as JoyTypography } from "@mui/joy"
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Button,
} from "@mui/material"
import { Delete, Flaky } from "@mui/icons-material"

import AuthContext from "../context"
import { relaxExercise, cover, sleep } from "../helpers/block_helpers"
import CustomLabel from "../components/CustimTitleLabel"
import BlocksList from "../components/WorkoutBlockList"
import ListVideo from "../components/ExercisesListVideo"

const Workout = () => {
  let { id } = useParams()
  const { token, snackbar, setDraftWorkout } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const navigate = useNavigate()

  const [workout, setWorkout] = useState(null)
  const [exercises, setExercises] = useState(null)
  const [totalDur, setTotalDur] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)

  const [currTxt, setCurrTxt] = useState("")
  const [nextTxt, setNextTxt] = useState("")

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
        const workout = response.data
        setWorkout(workout)
        if (workout.blocks?.length) {
          let exercises = []
          let td = 0
          workout.blocks?.forEach((b) => {
            td += b.totalDuration
            exercises = [...exercises, b]
          })

          setTotalDur(td)
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
    if (!workout?.blocks?.length) {
      return
    }

    setCurrExercise(cover)
    setNextExercise(exercises[0])

    // START
    setCurrTxt("cover for 2 seconds")
    setNextTxt("plan show")
    await sleep(2000)
    setCurrTxt("plan show for 3 seconds")
    setNextTxt("block preview for 10 seconds")
    await sleep(3000)

    for (let b = 0; b < workout.blocks?.length; b++) {
      //here I show preview for block
      setCurrExercise(relaxExercise)
      setNextExercise(workout.blocks[b]?.exercises[0])
      setNextTxt(workout.blocks[b].exercises[0].titleRu)
      setCurrTxt(
        `${b + 1}th block ${workout.blocks[b].titleRu} preview for 10 seconds`
      )
      setCount(10)

      let c = 0
      while (c < 10) {
        await sleep(1000)
        setCount((prev) => prev - 1)
        c++
      }

      for (let i = 0; i < workout.blocks[b]?.exercises?.length; i++) {
        setCurrTxt(
          `${b + 1}th  block: ${workout.blocks[b].titleRu}, ${
            i + 1
          }th exercise: ${workout.blocks[b].exercises[i].titleRu}`
        )
        let nt = ""
        if (i < workout.blocks[b]?.exercises?.length - 1) {
          nt = `${b + 1}th block: ${workout.blocks[b].titleRu}, ${
            i + 2
          }th exercise: ${workout.blocks[b].exercises[i + 1].titleRu}`
        } else {
          nt = "отдых"
        }

        setNextTxt(nt)
        setCurrIdx(i)
        setCurrExercise(workout.blocks[b].exercises[i])
        setCount(workout.blocks[b].onTime)

        setNextExercise(
          i + 1 < workout.blocks[b]?.exercises?.length
            ? workout.blocks[b].exercises[i + 1]
            : null
        )

        c = 0
        while (c < workout.blocks[b].onTime) {
          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }

        if (i < workout.blocks[b]?.exercises?.length - 1) {
          setCurrExercise(relaxExercise)
          setCount(workout.blocks[b].relaxTime)

          c = 0
          while (c < workout.blocks[b].relaxTime) {
            await sleep(1000)
            setCount((prev) => prev - 1)
            c++
          }
          setCurrExercise(null)
        }
      }
    }
    // finish
    setCurrExercise(relaxExercise)
    setNextExercise(null)
    let c = 0
    while (c < 10) {
      await sleep(1000)
      setCount((prev) => prev - 1)
      c++
    }
  }

  const toggleDraft = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/trainings/${id}/toggle_draft`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setWorkout(response.data)
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg(`fetch error: ${e}`)
      })
  }

  const handleAddBlock = () => {
    setDraftWorkout(workout)
    navigate("/blocks")
  }

  return (
    <>
      {token === null || !workout ? (
        <></>
      ) : (
        <>
          <JoyTypography level="h1">Workout</JoyTypography>
          {workout ? (
            <JoyTypography level="p" color="warning">
              {workout.draft ? "draft" : "ready"}
            </JoyTypography>
          ) : null}
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {isLoading && <CircularProgress size="3rem" />}
            {workout && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgb(110, 220, 120)",
                      padding: "5px 10px",
                    }}
                  >{`Total duration ${totalDur} minutes`}</div>
                  <div>
                    <IconButton
                      color={workout.draft ? "success" : undefined}
                      size="small"
                      onClick={toggleDraft}
                      title="toggle draft"
                    >
                      <Flaky />
                    </IconButton>
                    <IconButton size="small" onClick={handleDel}>
                      <Delete />
                    </IconButton>
                  </div>
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
                <ListVideo
                  {...{
                    currTxt,
                    nextTxt,
                    currExercise,
                    currIdx,
                    nextExercise,
                    count,
                    onPlay: startExerciseRoutine,
                  }}
                />
                <div
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <Typography variant="h5">Blocks</Typography>
                  {workout.draft && (
                    <Button onClick={handleAddBlock}>Add more blocks</Button>
                  )}
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
                  <BlocksList blocks={workout.blocks} />
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
