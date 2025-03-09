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
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { CloudUpload } from "@mui/icons-material"

import { AuthContext } from "../../App"

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
        <Grid direction="column" container rowSpacing={2}>
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

export default AddExercise
