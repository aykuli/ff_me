import React, { useEffect, useState, useContext } from "react"
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
} from "@mui/material"

import { AuthContext } from "../../App"
import { Typography } from "@mui/joy"

const CreateBlock = () => {
  const { token } = useContext(AuthContext)

  const [isUploading, setIsUploading] = useState(false)
  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  const [file, setFile] = useState(undefined)
  const [titleEn, setTitleEn] = useState(undefined)
  const [titleRu, setTitleRu] = useState(undefined)
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)

  useEffect(() => {
    if (file && titleEn && titleRu) {
      setSaveBtnDisabled(false)
    }
  }, [file, titleEn, titleRu])

  const handleSave = () => {
    setIsUploading(true)
    const data = new FormData()
    data.append("file", file)
    data.append("title_en", titleEn)
    data.append("title_ru", titleRu)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/exercises/create`,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setSbMsg("Successfully saved")
        setSbType("success")
        setTitleEn("")
        setTitleRu("")
        setFile(undefined)
      })
      .catch((e) => {
        setSbMsg("Exercise save error: " + e)
        setSbType("error")
      })
      .finally(() => {
        setOpenSb(true)
        setSaveBtnDisabled(true)
        setIsUploading(false)
      })
  }

  const handleTxtInputValue = (type, e) => {
    const v = e.target.value
    if (v.length > 3) {
      switch (type) {
        case "titleEn":
          setTitleEn(v)
          break
        case "titleRu":
          setTitleRu(v)
          break
        default:
          console.log("try harder")
      }
    }
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
              fullWidth
              id="title_en"
              label="title english"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleEn", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              fullWidth
              id="title_ru"
              label="title russian"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleRu", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              fullWidth
              type="number"
              id="total_duration"
              label="Total duration time (minutes)"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("totalDuration", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              fullWidth
              type="number"
              id="exercises count"
              label="Exercises quantity"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("exercisesCount", e)}
            />
          </Grid>
          <Grid size={"100%"} sx={{ mt: 2 }}>
            <Typography level="title-md">On time (seconds)</Typography>
            <Slider
              aria-label="onTime"
              defaultValue={30}
              value={50}
              // getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={10}
              marks
              min={10}
              max={60}
            />
          </Grid>
          <Grid size={"100%"}>
            <Typography level="title-md">Relax time (seconds)</Typography>
            <Slider
              aria-label="onTime"
              defaultValue={30}
              // getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
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
              color="danger"
              onClick={handleSave}
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
