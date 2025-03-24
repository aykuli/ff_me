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
import { Delete } from "@mui/icons-material"

import CustomLabel from "../components/CustimTitleLabel"
import AuthContext from "../context"
import ExercisesList from "../components/ExercisesList"
import Squares from "../components/BlockLabelSquares"
import ListVideo from "../components/ExercisesListVideo"

const relaxExercise = {
  relax: true,
  filename: "files/relax.mp4",
  titleEn: "relax",
  titleRu: "отдых",
}

const Block = () => {
  let { id } = useParams()
  const { token, snackbar, setDraftBlock } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const navigate = useNavigate()

  const [block, setBlock] = useState(null)
  const [exercises, setExercises] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)

  const [currIdx, setCurrIdx] = useState(0)
  const [count, setCount] = useState(10)

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
      setCount(block?.onTime)
      setNextExercise(i + 1 < exercises.length ? exercises[i + 1] : null)

      c = 0
      while (c < block?.onTime) {
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
        setBlock(response.data)
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => {
        getExercises()
      })

    const getExercises = () => {
      setIsLoading(true)
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/exercises/list`,
        data: { blockIds: [Number(id)] },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: token,
        },
      })
        .then((response) => {
          setExercises(response.data)
        })
        .catch((e) => {
          setOpen(true)
          setType("error")
          setMsg("Server exercises fetch error")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [id, token, setMsg, setType, setOpen])

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
      data: {
        titleEn: block.titleEn,
        titleRu: block.titleRu,
      },
      headers: {
        "Access-Control-Allow-Origin": "*", // todo change
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
    setDraftBlock({ ...block, exercises })
    navigate("/exercises")
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

                {(block.totalDuration * 60) / (block.onTime + block.relaxTime) >
                  exercises.length && (
                  <div>
                    <p>Please, add some exercise.</p>
                    <Button onClick={handleChooseExercise}>
                      Go to exercises page
                    </Button>
                  </div>
                )}

                {exercises.length !== 0 && (
                  <ExercisesList list={exercises} countable />
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
