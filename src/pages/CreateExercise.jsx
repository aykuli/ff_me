import React, { useEffect, useState, useContext } from "react"
import axios from "axios"

import {
  Button,
  Box,
  TextField,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { CloudUpload } from "@mui/icons-material"
import { Typography } from "@mui/joy"

import AuthContext from "../context"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const CreateExercise = () => {
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [isUploading, setIsUploading] = useState(false)

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
    setSaveBtnDisabled(true)
    const data = new FormData()
    data.append("file", file)
    data.append("titleEn", titleEn)
    data.append("titleRu", titleRu)

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
        setMsg("Successfully saved")
        setType("success")
        setTitleEn("")
        setTitleRu("")
        setFile(undefined)
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
      })
      .finally(() => {
        setOpen(true)
        setIsUploading(false)
        setTitleEn("")
        setTitleRu("")
        setFile(undefined)
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
          <Grid size={"100%"}>
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUpload />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                multiple
              />
            </Button>
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

export default CreateExercise
