import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router"
import axios from "axios"
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Button,
} from "@mui/material"
import { Typography as JoyTypography } from "@mui/joy"
import { Delete, Flaky } from "@mui/icons-material"

import CustomLabel from "../components/CustimTitleLabel"
import ExercisesList from "../components/ExercisesList"
import Squares from "../components/BlockLabelSquares"
import ListVideo from "../components/ExercisesListVideo"
import AuthContext from "../context"
import { relaxExercise, sleep } from "../helpers/block_helpers"

const Block = () => {
  let { id } = useParams()
  const {
    token,
    snackbar,
    setDraftBlock,
    draftWorkout,
    addWorkoutBlock,
    deleteBlockExercise,
  } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const navigate = useNavigate()

  const [block, setBlock] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const [currTxt, setCurrTxt] = useState("")
  const [nextTxt, setNextTxt] = useState("")
  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)

  const [currIdx, setCurrIdx] = useState(0)
  const [count, setCount] = useState(10)
  const [reload, setReload] = useState(false)

  const [needMoreExercises, setNeedMoreExercises] = useState(false)

  async function startExerciseRoutine() {
    if (!block.exercises?.length) {
      return
    }

    setCurrExercise(relaxExercise)
    setNextExercise(block.exercises[0])
    setCurrTxt("relax")
    setNextTxt(block.exercises[0].titleRu)

    let c = 0
    while (c < 10) {
      await sleep(1000)
      setCount((prev) => prev - 1)
      c++
    }

    for (let i = 0; i < block.exercises.length; i++) {
      setCurrIdx(i)
      setCurrTxt(block.exercises[i].titleRu)
      setCurrExercise(block.exercises[i])
      setCount(block?.onTime)
      setNextExercise(
        i + 1 < block.exercises.length ? block.exercises[i + 1] : null
      )
      setNextTxt(
        i + 1 < block.exercises.length
          ? block.exercises[i + 1].titleRu
          : "finish"
      )

      c = 0
      while (c < block?.onTime) {
        await sleep(1000)
        setCount((prev) => prev - 1)
        c++
      }

      if (i + 1 > block.exercises.length) {
        // finish
        c = 0
        while (c < 10) {
          setCurrTxt("finish")
          setCurrExercise(relaxExercise)

          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }
        setCurrExercise(null)
        setNextExercise(null)
      } else {
        setCurrTxt("relax")

        setCurrExercise(relaxExercise)
        setCount(block?.relaxTime)

        c = 0
        while (c < block?.relaxTime) {
          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }
      }
    }
  }

  useEffect(() => {
    if (!token) {
      return
    }

    setIsLoading(true)
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        const newB = response.data
        setBlock(newB)
        setNeedMoreExercises(
          newB
            ? (newB.totalDuration * 60) / (newB.onTime + newB.relaxTime) >
                newB.exercises?.length
            : true
        )
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id, token, setMsg, setType, setOpen, reload])

  const handleEdit = (lang) => {
    if (lang === "ru") {
      setIsEditRu(true)
    } else {
      setIsEditEn(true)
    }
  }

  const handleSave = (lang, value) => {
    setBlock((prev) => {
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
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}`,
      data: {
        titleEn: block.titleEn,
        titleRu: block.titleRu,
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

  const handleDel = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}`,
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

  const handleChooseExercise = () => {
    setDraftBlock(block)
    navigate("/exercises")
  }

  const toggleDraft = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/blocks/${id}/toggle_draft`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setBlock(response.data)
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg(`fetch error: ${e}`)
      })
  }

  const handleAddToWorkout = () => {
    addWorkoutBlock(block)
    navigate("/blocks")
  }

  return (
    <>
      {token === null ? (
        <></>
      ) : (
        <>
          <JoyTypography level="h1">Block</JoyTypography>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {isLoading && <CircularProgress size="3rem" />}
            {block && (
              <div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                  {draftWorkout && !needMoreExercises ? (
                    <Button
                      color={
                        block.draft && !needMoreExercises
                          ? "success"
                          : undefined
                      }
                      size="small"
                      onClick={handleAddToWorkout}
                      title="add block to draft workout"
                    >
                      Add to workout
                    </Button>
                  ) : null}

                  <IconButton
                    color={
                      block.draft && !needMoreExercises ? "success" : undefined
                    }
                    size="small"
                    onClick={toggleDraft}
                    title={`make ${block.draft ? "ready" : "draft"}`}
                  >
                    <Flaky />
                  </IconButton>
                  <IconButton size="small" onClick={handleDel}>
                    <Delete />
                  </IconButton>
                </div>
                <CustomLabel
                  lang="en"
                  isEdit={isEditEn}
                  title={block.titleEn}
                  onEdit={() => handleEdit("en")}
                  onSave={(v) => handleSave("en", v)}
                />
                <CustomLabel
                  lang="ru"
                  isEdit={isEditRu}
                  title={block.titleRu}
                  onEdit={() => handleEdit("ru")}
                  onSave={(v) => handleSave("ru", v)}
                />
                <Squares {...block} />
                {block.draft ? null : (
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
                )}
                <div>
                  <Typography variant="h5">Exercises</Typography>
                </div>

                {needMoreExercises && (
                  <div>
                    <p>Please, add some exercise.</p>
                    <Button onClick={handleChooseExercise}>
                      Go to exercises page
                    </Button>
                  </div>
                )}

                {block.exercises?.length !== 0 && (
                  <ExercisesList
                    list={block.exercises}
                    countable
                    onDelete={(exercise) => {
                      deleteBlockExercise(exercise, block)
                      setReload(true)
                    }}
                  />
                )}
              </div>
            )}
          </Box>
        </>
      )}
    </>
  )
}

export default Block
