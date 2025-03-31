import { useState, useContext } from "react"
import axios from "axios"
import {
  Box,
  CircularProgress,
  IconButton,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import AuthContext from "../context"
import CustomLabel from "../components/CustimTitleLabel"

const Item = ({ exercise, onAdd, onDelete, included }) => {
  const { token, snackbar, draftBlock } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

  const [value, setV] = useState(exercise)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditEn, setIsEditEn] = useState(false)
  const [isEditRu, setIsEditRu] = useState(false)

  const url = `${process.env.REACT_APP_CDN_URL}/${exercise.filename}`

  const save = () => {
    if (!token) {
      return
    }

    setIsLoading(true)
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/exercises/${value.id}`,
      data: {
        titleEn: value.titleEn,
        titleRu: value.titleRu,
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

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        pb: 4,
      }}
    >
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <div style={{ paddingBottom: 10 }}>
          <CustomLabel
            lang="en"
            isEdit={isEditEn}
            title={value.titleEn}
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
              alignItems: "end",
            }}
          >
            {draftBlock ? (
              <>
                <Button
                  variant="contained"
                  edge="end"
                  size="small"
                  onClick={() => onAdd(value)}
                  color={included ? "secondary" : "primary"}
                  title="Add exercise to the draft block"
                >
                  <Add />
                </Button>

                <FormControl variant="standard" sx={{ width: 200 }}>
                  <InputLabel id="side-label">Side</InputLabel>
                  <Select
                    labelId="side-label"
                    id="side"
                    value={value.side === "" ? "none" : value.side}
                    onChange={(e) => {
                      setV((prev) => {
                        const v = e.target.value
                        return { ...prev, side: v === "none" ? "" : v }
                      })
                    }}
                    label="Side"
                  >
                    {["none", "rigth", "left", "backward", "forward"].map(
                      (v) => {
                        return (
                          <MenuItem key={v} value={v}>
                            {v}
                          </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </FormControl>
              </>
            ) : (
              <div></div>
            )}

            <IconButton edge="end" size="small" onClick={() => onDelete(value)}>
              <Delete />
            </IconButton>
          </div>
        </div>
      )}
      <Divider />
    </Box>
  )
}

export default Item
