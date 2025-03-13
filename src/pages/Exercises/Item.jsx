import React, { useState } from "react"
import axios from "axios"

import { Box, CircularProgress, IconButton, Button } from "@mui/material"
import { Stack, TextField, Snackbar, Alert } from "@mui/material"
import { Typography } from "@mui/joy"
import { Add, Delete, EditOutlined, PanoramaFishEye } from "@mui/icons-material"

function CustomLabel({ lang, title, isEdit, onEdit, onSave, ...props }) {
  const [value, setValue] = useState(title)
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      {...props}
    >
      {isEdit ? (
        <TextField
          fullWidth
          id={title}
          label={lang}
          variant="outlined"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      ) : (
        <Typography level="body-md" sx={{ fontSize: "xl", mb: 0.5, mt: 2 }}>
          {title}
        </Typography>
      )}
      <IconButton
        onClick={isEdit ? () => onSave(value) : onEdit}
        aria-label="select item"
        size="small"
      >
        {!isEdit ? (
          <EditOutlined fontSize="inherit" color="primary" />
        ) : (
          <PanoramaFishEye fontSize="inherit" color="primary" />
        )}
      </IconButton>
    </Stack>
  )
}

const Item = ({ exercise }) => {
  const [value, setV] = useState(exercise)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)
  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  const url = `${process.env.REACT_APP_CDN_URL}/${exercise.filename}`

  const src = `${process.env.REACT_APP_API_URL}/exercises`

  const save = () => {
    setOpenSb(true)
    setIsLoading(true)
    axios({
      method: "POST",
      url: `${src}/${value.id}`,
      data: {
        title_en: value.titleEn,
        title_ru: value.titleRu,
      },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
      },
    })
      .then((response) => {
        setSbMsg("Successfully saved")
        setSbType("success")
      })
      .catch((e) => {
        setSbMsg("Exercise save error: " + e)
        setSbType("error")
      })
      .finally(() => setIsLoading(false))
  }

  const handleEdit = (lang) => {
    if (lang === "ru") {
      setIsEditRu(true)
    } else {
      setIsEditEn(true)
    }
  }

  const handleSave = (lang, value) => {
    setV((prev) => {
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

  const handleCloseSb = () => {
    setOpenSb(false)
    setSbMsg("")
  }

  const handleDel = (id) => {
    axios({
      method: "DELETE",
      url: `${src}/${value.id}`,
      data: {
        title_en: value.titleEn,
        title_ru: value.titleRu,
      },
      headers: {
        "Access-Control-Allow-Origin": "*", // todo change
      },
    })
      .then((response) => {
        setSbMsg("Successfully deleted")
        setSbType("success")
      })
      .catch((e) => {
        setSbMsg("Exercise save error: " + e)
        setSbType("error")
      })
      .finally(() => {
        setIsLoading(false)
        window.location.reload()
      })
  }

  const handleAdd = (id) => {
    console.log("there will be adding to the block functionality")
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
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
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <div>
          <CustomLabel
            lang="en"
            title={value.titleEn}
            isEdit={isEditEn}
            onEdit={() => handleEdit("en")}
            onSave={(v) => handleSave("en", v)}
          />
          <CustomLabel
            lang="ru"
            isEdit={isEditRu}
            title={value.titleRu}
            onEdit={() => handleEdit("ru")}
            onSave={(v) => handleSave("ru", v)}
          />
          <Box sx={{ mt: 3 }}>
            <video controls loop muted width={"100%"}>
              <source controls src={url} type="video/mp4" />
            </video>
          </Box>
          <div
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              edge="end"
              size="small"
              onClick={() => handleAdd(value.id)}
              color="primary"
            >
              <Add />
            </Button>

            <IconButton
              edge="end"
              size="small"
              onClick={() => handleDel(value.id)}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      )}
    </Box>
  )
}

export default Item
