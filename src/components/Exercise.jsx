import React, { useState, useContext } from "react"
import axios from "axios"
import { Box, CircularProgress, IconButton, Button } from "@mui/material"
import { Stack, TextField, Typography } from "@mui/material"
import { Add, Delete, EditOutlined, PanoramaFishEye } from "@mui/icons-material"
import AuthContext from "../context"

function CustomLabel({
  lang,
  title,
  isEdit,
  onEdit,
  onSave,
  editable,
  ...props
}) {
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
        <Typography variant="body" sx={{ fontSize: "xl", mb: 0.5, mt: 2 }}>
          {title}
        </Typography>
      )}
      {editable ? (
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
      ) : null}
    </Stack>
  )
}

const Item = ({ exercise, onAdd, included, editable }) => {
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [value, setV] = useState(exercise)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const url = `${process.env.REACT_APP_CDN_URL}/${exercise.filename}`

  const src = `${process.env.REACT_APP_API_URL}/exercises`

  const save = () => {
    if (!token) {
      return
    }

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
        setMsg("Successfully saved")
        setType("success")
      })
      .catch((e) => {
        setType("error")
        setMsg("Server exercises fetch error")
      })
      .finally(() => {
        setOpen(true)
        setIsLoading(false)
      })
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

  const handleDel = () => {
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
        setMsg("Successfully deleted")
        setType("success")
      })
      .catch((e) => {
        setMsg("Exercise save error: " + e)
        setType("error")
      })
      .finally(() => {
        setIsLoading(false)
        window.location.reload()
      })
  }

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <div>
          <CustomLabel
            lang="en"
            isEdit={isEditEn}
            editable={editable}
            title={value.titleEn}
            onEdit={() => handleEdit("en")}
            onSave={(v) => handleSave("en", v)}
          />
          <CustomLabel
            lang="ru"
            isEdit={isEditRu}
            editable={editable}
            title={value.titleRu}
            onEdit={() => handleEdit("ru")}
            onSave={(v) => handleSave("ru", v)}
          />
          <Box sx={{ mt: 3 }}>
            <video controls loop muted width={"100%"}>
              <source controls src={url} type="video/mp4" />
            </video>
          </Box>
          {editable ? (
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
                onClick={() => onAdd(value.id)}
                color={included ? "secondary" : "primary"}
              >
                <Add />
              </Button>

              <IconButton edge="end" size="small" onClick={handleDel}>
                <Delete />
              </IconButton>
            </div>
          ) : null}
        </div>
      )}
    </Box>
  )
}

export default Item
