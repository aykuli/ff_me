import { Box } from "@mui/material"
import { Typography } from "@mui/joy"
import { useEffect, useState } from "react"
import Video from "./Video"

const relaxVideoSrc = "files/relax.mp4"

const ListVideo = ({ onTime, relaxTime, totalDuration, exercises }) => {
  const [currIdx, setCurrIdx] = useState(0)
  const [count, setCount] = useState(0)
  const [currTime, setCurrtime] = useState(null)
  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)
  const [currVideo, setCurrVideo] = useState(null)
  const [nextVideoUrl, setNextideoUrl] = useState(null)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    async function startExerciseRoutine() {
      setCurrExercise(exercises[0])
      setNextExercise(exercises[1])
      setCurrVideo(relaxVideoSrc)
      await sleep(5000)

      for (let i = 0; i < exercises.length; i++) {
        setCurrIdx(i)
        setCurrExercise(exercises[i])
        setCurrVideo(exercises[i].filename)

        if (i + 1 < exercises.length) {
          setNextExercise(exercises[i + 1])
        }

        await sleep(onTime * 1000)
        setCurrVideo(relaxVideoSrc)
        await sleep(relaxTime * 1000)
      }
      await sleep(5000)
    }

    startExerciseRoutine()
  }, [exercises])

  return (
    <Box sx={{ mt: 3 }}>
      <Typography level="h2">Current exercise</Typography>
      {currExercise && currVideo && (
        <div style={{ position: "relative" }}>
          <Video urls={[`${process.env.REACT_APP_CDN_URL}${currVideo}`]} />
          <div
            style={{
              position: "absolute",
              top: 0,
              margin: 10,
              padding: 5,
              backgroundColor: "white",
            }}
          >
            <Typography level="body" color="success">
              {`${currIdx} ${currExercise.titleEn}`}
            </Typography>
          </div>
        </div>
      )}
      <Typography level="h2">Next exercise</Typography>
      {nextExercise && (
        <div style={{ position: "relative" }}>
          <Video
            urls={[`${process.env.REACT_APP_CDN_URL}${nextExercise.filename}`]}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              margin: 10,
              padding: 5,
              backgroundColor: "white",
            }}
          >
            <Typography level="body" color="success">
              {`${currIdx+1} ${nextExercise.titleEn}`}
            </Typography>
          </div>
        </div>
      )}
    </Box>
  )
}

export default ListVideo
