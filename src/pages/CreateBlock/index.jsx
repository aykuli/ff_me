import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  Snackbar,
  Alert,
  Button,
  Box,
  TextField,
  Grid2 as Grid,
  CircularProgress,
  Slider,
  Typography,
} from "@mui/material"

import AuthContext from "../../context"
import { full, initBody, buildRequest } from "./helpers"

const CreateBlock = () => {
  const { token, setDraftBlock } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isUploading, setIsUploading] = useState(false)
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)
  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  const [body, setBody] = useState(initBody)

  useEffect(() => {
    setSaveBtnDisabled(!full(body))
  }, [body, body.titleEn, body.titleRu])

  const handleSave = () => {
    setIsUploading(true)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/blocks/create`,
      data: buildRequest(body),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setSbMsg("Successfully saved")
        setSbType("success")
        setBody(initBody)
      })
      .catch((e) => {
        setSbMsg("Exercise save error: " + e)
        setSbType("error")
      })
      .finally(() => {
        setOpenSb(true)
        setSaveBtnDisabled(true)
        setIsUploading(false)
        setDraftBlock(body)
        navigate("/exercises")
      })
  }

  const handleTxtInputValue = (type, v) => {
    if (!body[type]) {
      return
    }

    setBody((prev) => {
      if (["totalDuration", "onTime"].includes(type) && v === 0) {
        return prev
      }

      prev[type] = v
      const totalDuration = type === "totalDuration" ? v : prev.totalDuration
      const onTime = type === "onTime" ? v : prev.onTime
      const relaxTime = type === "relaxTime" ? v : prev.relaxTime

      return {
        ...prev,
        [type]: v,
        exercisesCount: (totalDuration * 60) / (onTime + relaxTime),
      }
    })
  }

  const handleCloseSb = () => {
    setOpenSb(false)
    setSbMsg("")
  }

  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSb}
      >
        <Alert
          onClose={handleCloseSb}
          severity={sbType}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          {sbMsg}
        </Alert>
      </Snackbar>
      <Box
        sx={{ width: "100%" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid direction="column" container rowSpacing={4}>
          <Grid size={"100%"}>
            <TextField
              value={body.titleEn}
              fullWidth
              id="title_en"
              label="title english"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleEn", e.target.value)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              value={body.titleRu}
              fullWidth
              id="title_ru"
              label="title russian"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleRu", e.target.value)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              value={body.totalDuration}
              defaultValue={body.totalDuration}
              onChange={(e) =>
                handleTxtInputValue("totalDuration", e.target.value)
              }
              fullWidth
              type="number"
              id="total_duration"
              label="Total duration time (minutes)"
              variant="outlined"
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              value={body.exercisesCount}
              disabled
              fullWidth
              type="number"
              id="exercises count"
              label="Exercises quantity"
              variant="outlined"
            />
          </Grid>
          <Grid size={"100%"} sx={{ mt: 2 }}>
            <Typography component={"span"} sx={{ pr: 1 }}>
              {body.onTime}
            </Typography>
            <Typography level="body-md" component={"span"}>
              seconds ON time
            </Typography>
            <Slider
              aria-label="onTime"
              defaultValue={initBody.onTime}
              value={body.onTime}
              onChangeCommitted={(e, v) => handleTxtInputValue("onTime", v)}
              valueLabelDisplay="auto"
              shiftStep={10}
              step={10}
              marks
              min={20}
              max={60}
            />
          </Grid>
          <Grid size={"100%"} sx={{ mt: 2 }}>
            <Typography component={"span"} sx={{ pr: 1 }}>
              {body.relaxTime}
            </Typography>
            <Typography level="body-md" component={"span"}>
              seconds RELAX time
            </Typography>
            <Slider
              aria-label="relaxTime"
              defaultValue={initBody.relaxTime}
              value={body.relaxTime}
              onChangeCommitted={(e, v) => handleTxtInputValue("relaxTime", v)}
              valueLabelDisplay="auto"
              shiftStep={10}
              step={10}
              marks
              min={0}
              max={30}
            />
          </Grid>

          <Grid size={"100%"} sx={{ mt: 5 }} display={"flex"} gap={2}>
            <Button
              component="button"
              variant="contained"
              tabIndex={-1}
              fullWidth
              color="warning"
              onClick={() => setBody(initBody)}
              disabled={saveBtnDisabled || isUploading}
            >
              Discard
            </Button>
            <Button
              component="button"
              variant="contained"
              tabIndex={-1}
              fullWidth
              color="success"
              onClick={handleSave}
              disabled={saveBtnDisabled || isUploading}
            >
              {isUploading ? <CircularProgress size="small" /> : null}
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CreateBlock
