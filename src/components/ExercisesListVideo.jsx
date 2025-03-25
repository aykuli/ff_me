import { Box, Button } from "@mui/material"
import { Typography } from "@mui/joy"
import Video from "./Video"

const ListVideo = ({ currExercise, currIdx, nextExercise, count, onPlay }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Button variant="contained" onClick={onPlay}>
        Play
      </Button>
      <Typography level="h2">Current exercise</Typography>
      {currExercise && (
        <div style={{ position: "relative" }}>
          <Video
            urls={[`${process.env.REACT_APP_CDN_URL}/${currExercise.filename}`]}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              margin: 20,
            }}
          >
            <p
              style={{
                fontSize: "2em",
                fontWeight: 600,
                color: "#442129",
                padding: "5px 20px",
                marginBottom: 5,
                margin: 0,
                backgroundColor: "white",
              }}
            >
              {`${currExercise.relax ? "" : currIdx + 1} ${
                currExercise.titleEn
              }`}
            </p>
            <span
              style={{
                fontSize: "1.5em",
                fontWeight: 600,
                color: "#554438",
                padding: "5px 10px",
                margin: 0,
                backgroundColor: "white",
              }}
            >
              {currExercise.side}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              top: "30%",
              margin: 20,
              backgroundColor: "white",
              width: 120,
              height: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "4em", fontWeight: 600, color: "#442129" }}>
              {count}
            </p>
          </div>
        </div>
      )}
      <Typography level="h2">Next exercise</Typography>
      {nextExercise && (
        <div style={{ position: "relative" }}>
          <Video
            urls={[`${process.env.REACT_APP_CDN_URL}/${nextExercise.filename}`]}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              margin: 20,
              backgroundColor: "white",
            }}
          >
            <p
              style={{
                fontSize: "2em",
                fontWeight: 600,
                color: "#442129",
                padding: "5px 20px",
                margin: 0,
              }}
            >
              {`${currIdx + 2} ${nextExercise.titleEn}`}
            </p>
          </div>
        </div>
      )}
    </Box>
  )
}

export default ListVideo
