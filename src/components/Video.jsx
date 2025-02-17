import * as React from "react"
import Box from "@mui/joy/Box"
import Card from "@mui/joy/Card"
import CardCover from "@mui/joy/CardCover"
import CardContent from "@mui/joy/CardContent"
import Typography from "@mui/joy/Typography"

const Video = () => {
  return (
    <Box
      component="div"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 5, m: 0 }}
    >
      <Card component="div" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardContent>
          <video
            controls
            autoPlay
            loop
            muted
            poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="https://assets.codepen.io/6093409/river.mp4"
              type="video/mp4"
            />
          </video>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Video
