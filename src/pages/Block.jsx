import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router"
import axios from "axios"
import { Box, CircularProgress, IconButton, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material"

import CustomLabel from "../components/CustimTitleLabel"
import AuthContext from "../context"
import ExercisesList from "../components/ExercisesList"
import Squares from "../components/BlockLabelSquares"
import ListVideo from "../components/ExercisesListVideo"

const Block = () => {
  let { id } = useParams()
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [block, setBlock] = useState(null)
  const [exercises, setExercises] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  useEffect(() => {
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
        title_en: block.titleEn,
        title_ru: block.titleRu,
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
        title_en: block.titleEn,
        title_ru: block.titleRu,
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

  return (
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
            editable
            title={block.titleEn}
            onEdit={() => handleEdit("en")}
            onSave={(v) => handleSave("en", v)}
          />
          <CustomLabel
            lang="ru"
            isEdit={isEditRu}
            editable
            title={block.titleRu}
            onEdit={() => handleEdit("ru")}
            onSave={(v) => handleSave("ru", v)}
          />
          <Squares {...block} />
          <ListVideo
            onTime={block.onTime}
            relaxTime={block.relaxTime}
            totalDuration={block.totalDuration}
            exercises={exercises}
          />
          <div>
            <Typography variant="h5">Exercises</Typography>
            <ExercisesList list={exercises} />
          </div>
        </div>
      )}
    </Box>
  )
}

export default Block
