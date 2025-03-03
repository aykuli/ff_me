import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import {
  Button,
  Box,
  TextField,
  Container,
  Grid2 as Grid,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { Typography } from "@mui/joy"

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

const AddExercise = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(undefined)
  const [successMsg, setSuccessMsg] = useState(undefined)
  const [file, setFile] = useState(undefined)
  const [titleEn, setTitleEn] = useState(undefined)
  const [titleRu, setTitleRu] = useState(undefined)
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true)

  const navigate = useNavigate()
  // make green popover showing cusess fully uploading

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
      },
    })
      .then((response) => {
        setSuccessMsg("Successfully saved")
        setTitleEn(undefined)
        setTitleRu(undefined)
        setFile(undefined)
      })
      .catch((e) => setError("Server exercises fetch error"))
      .finally(() => {
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
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {successMsg ? (
        <div>
          <Button
            component="button"
            variant="text"
            tabIndex={-1}
            onClick={() => navigate("/exercises")}
          >
            Go to the list of exercises
          </Button>
        </div>
      ) : null}
      <Typography level="h3" gutterBottom>
        Add new exercise
      </Typography>
      <Box
        sx={{ width: "100%" }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Grid direction="column" container rowSpacing={2}>
          <Grid size={"100%"}>
            <TextField
              id="title_en"
              label="title_en"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleEn", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <TextField
              id="title_ru"
              label="title_ru"
              variant="outlined"
              onChange={(e) => handleTxtInputValue("titleRu", e)}
            />
          </Grid>
          <Grid size={"100%"}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  console.log(e.target.files)
                  console.log(e.target.files[0])
                  setFile(e.target.files[0])
                }}
                multiple
              />
            </Button>
          </Grid>
          <Grid size={"100%"}>
            <Button
              component="button"
              variant="contained"
              tabIndex={-1}
              onClick={handleSave}
              disabled={saveBtnDisabled}
            >
              {isUploading ? <CircularProgress size="small" /> : null}
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AddExercise
