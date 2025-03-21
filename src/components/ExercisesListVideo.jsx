import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Video from "./Video"

const relaxVideoSrc = "files/relax.mp4"

const ListVideo = ({ totalDuration, exercises }) => {
  const onTime = 10
  const relaxTime = 0
  const [currIdx, setCurrIdx] = useState(0)
  const [currTime, setCurrtime] = useState(null)
  const [currExercise, setCurrExercise] = useState(null)
  const [currVideo, setCurrVideo] = useState(null)
  const [nextVideoUrl, setNextideoUrl] = useState(null)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  async function startExerciseRoutine() {
    setCurrExercise(exercises[0])
    setCurrVideo(relaxVideoSrc)
    await sleep(5000)

    for (let i = 0; i < exercises.length; i++) {
      console.log(i)
      setCurrIdx(i)
      setCurrExercise(exercises[i])
      setCurrVideo(exercises[i].filename)
      await sleep(onTime * 1000)
      setCurrVideo(relaxVideoSrc)
      await sleep(relaxTime * 1000)
    }
    await sleep(5000)
  }

  // useEffect(() => {
  //   async function startExerciseRoutine() {
  //     setCurrExercise(exercises[0])
  //     setCurrVideo(relaxVideoSrc)
  //     await sleep(5000)

  //     for (let i = 0; i < exercises.length; i++) {
  //       console.log(i)
  //       setCurrIdx(i)
  //       setCurrExercise(exercises[i])
  //       setCurrVideo(exercises[i].filename)
  //       await sleep(onTime * 1000)
  //       setCurrVideo(relaxVideoSrc)
  //       await sleep(relaxTime * 1000)
  //     }
  //     await sleep(5000)
  //   }

  //   startExerciseRoutine()
  // }, [exercises])

  return (
    <Box sx={{ mt: 3 }}>
      {currExercise && currVideo && (
        <div style={{ position: "relative" }}>
          <Video
            urls={[`${process.env.REACT_APP_CDN_URL}${currVideo}`]}
            onStart={startExerciseRoutine}
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
            <Typography variant="body" color="success">
              {`${currIdx} ${currExercise.titleEn}`}
            </Typography>
          </div>
        </div>
      )}
    </Box>
  )
}

export default ListVideo
