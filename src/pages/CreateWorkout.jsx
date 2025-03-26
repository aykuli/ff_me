import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  Button,
  Box,
  TextField,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"

const CreateWorkout = () => {
  const navigate = useNavigate()

  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [isUploading, setIsUploading] = useState(false)

  const [titleEn, setTitleEn] = useState(undefined)
  const [titleRu, setTitleRu] = useState(undefined)
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)

  useEffect(() => {
    if (titleEn && titleRu) {
      setSaveBtnDisabled(false)
    }
  }, [titleEn, titleRu])

  const handleSave = () => {
    setIsUploading(true)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/trainings/create`,
      data: { titleEn, titleRu },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
        Authorization: token,
      },
    })
      .then((response) => {
        setMsg("Successfully saved")
        setType("success")
        setTitleEn("")
        setTitleRu("")
        navigate(`/workouts/${response.data.id}`)
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
      })
      .finally(() => {
        setOpen(true)
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

  return (
    <>
      <Typography level="h1">Create exercise</Typography>
      <Box
        sx={{ width: "100%", mt: 2 }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid direction="column" container rowSpacing={2}>
          <Grid size={"100%"}>
            <TextField
              fullWidth
              id="titleRn"
              label="title english"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleEn", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              fullWidth
              id="titleRu"
              label="title russian"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleRu", e)}
            />
          </Grid>
          <Grid size={"100%"} style={{ marginTop: "6vh" }}>
            <Button
              component="button"
              variant="contained"
              tabIndex={-1}
              fullWidth
              color="success"
              onClick={handleSave}
              disabled={saveBtnDisabled}
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

export default CreateWorkout
