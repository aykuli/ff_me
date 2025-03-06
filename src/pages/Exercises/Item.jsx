import React, { useState, useEffect } from "react"
import axios from "axios"

import { Box, CircularProgress } from "@mui/material"
import { Typography } from "@mui/joy"

const Item = ({ open, exercise }) => {
  const [isLoading, setIsLoading] = useState(false)
  const src = `${process.env.REACT_APP_CDN_URL}${exercise.filename}`

  useEffect(() => {
    if (!open) {
      return
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_CDN_URL}${exercise.filename}`,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((e) => {
        console.Error("Server exercises fetch error")
      })
      .finally(() => setIsLoading(false))
  }, [open, exercise.filename])

  return (
    <Box sx={{ width: "100%", maxWidth: 640, bgcolor: "background.paper" }}>
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <div>
          <Typography level="body-md" sx={{ fontSize: "xl", mb: 0.5, mt: 2 }}>
            {exercise.titleEn}
          </Typography>
          <Typography level="body-md" sx={{ fontSize: "xl", mb: 2 }}>
            {exercise.titleRu}
          </Typography>
          <Box>
            <video controls loop muted width={"100%"}>
              <source controls src={src} type="video/mp4" />
            </video>
          </Box>
        </div>
      )}
    </Box>
  )
}

export default Item
