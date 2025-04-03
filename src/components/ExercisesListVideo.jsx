import { Box, Button, useMediaQuery } from "@mui/material"
import { Typography } from "@mui/joy"

import Video from "./Video"

const ListVideo = ({
  currTxt,
  nextTxt,
  currExercise,
  currIdx,
  nextExercise,
  count,
  onPlay,
}) => {
  const desktop = useMediaQuery("(min-width:600px)")

  return (
    <Box sx={{ mt: 3 }}>
      <Button sx={{ mb: 4 }} variant="contained" onClick={onPlay}>
        Play
      </Button>
      {currExercise && (
        <Typography level="h2">{`Current: ${currTxt}`}</Typography>
      )}
      {currExercise && (
        <div style={{ position: "relative", maxWidth: 700 }}>
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
                fontSize: desktop ? "2em" : "1.5em",
                fontWeight: 600,
                color: "#442129",
                padding: "5px 20px",
                marginBottom: 5,
                margin: 0,
                backgroundColor: "white",
              }}
            >
              {`${currExercise.relax ? "" : currIdx + 1} ${
                currExercise.titleRu
              }`}
            </p>

            {currExercise.side && currExercise.side !== "" ? (
              <span
                style={{
                  fontSize: desktop ? "1.5em" : "1em",
                  fontWeight: 600,
                  color: "#554438",
                  padding: "5px 10px",
                  margin: 0,
                  backgroundColor: "white",
                }}
              >
                {currExercise.side}
              </span>
            ) : null}
          </div>
          <div
            style={{
              position: "absolute",
              top: desktop ? "30%" : "40%",
              margin: 20,
              backgroundColor: "white",
              width: desktop ? 120 : 50,
              height: desktop ? 120 : 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: desktop ? "4em" : "2em",
                fontWeight: 600,
                color: "#442129",
              }}
            >
              {count}
            </p>
          </div>
        </div>
      )}
      {nextExercise && <Typography level="h2">{`Next: ${nextTxt}`}</Typography>}
      {nextExercise && (
        <div style={{ position: "relative", maxWidth: 600 }}>
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
              {`${currIdx + 2} ${nextExercise.titleRu}`}
            </p>
          </div>
        </div>
      )}
    </Box>
  )
}

export default ListVideo
