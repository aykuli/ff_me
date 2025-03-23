import { Box } from "@mui/material"
import { Typography } from "@mui/joy"
import { useEffect, useLayoutEffect, useState } from "react"
import Video from "./Video"

const relaxExercise = {
  relax: true,
  filename: "files/relax.mp4",
  titleEn: "relax",
  titleRu: "отдых",
}

const ListVideo = ({ onTime, relaxTime, totalDuration, exercises }) => {
  let a = 0
  const [currExercise, setCurrExercise] = useState(null)
  const [nextExercise, setNextExercise] = useState(null)

  const [currIdx, setCurrIdx] = useState(0)
  const [count, setCount] = useState(10)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  useLayoutEffect(() => {
    a++
    if (a > 1) {
      return
    }

    async function startExerciseRoutine() {
      setCurrExercise(relaxExercise)
      setNextExercise(exercises[0])
      let c = 0
      while (c < 10) {
        await sleep(1000)
        setCount((prev) => prev - 1)
        c++
      }

      for (let i = 0; i < exercises.length; i++) {
        setCurrIdx(i)
        setCurrExercise(exercises[i])
        setCount(onTime)
        setNextExercise(i + 1 < exercises.length ? exercises[i + 1] : null)

        let c = 0
        while (c < onTime) {
          await sleep(1000)
          setCount((prev) => prev - 1)
          c++
        }

        if (i + 1 < exercises.length) {
          // finish
          c = 0
          while (c < 10) {
            await sleep(1000)
            setCount((prev) => prev - 1)
            c++
          }
        } else {
          setCurrExercise(relaxExercise)
          setCount(relaxTime)

          c = 0
          while (c < relaxTime) {
            await sleep(1000)
            setCount((prev) => prev - 1)
            c++
          }
        }
      }
    }

    startExerciseRoutine()
  }, [exercises, onTime, relaxTime, a])

  return (
    <Box sx={{ mt: 3 }}>
      <Typography level="h2">Current exercise</Typography>
      {currExercise && (
        <div style={{ position: "relative" }}>
          <Video
            urls={[`${process.env.REACT_APP_CDN_URL}${currExercise.filename}`]}
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
              {`${currExercise.relax ? "" : currIdx + 1} ${
                currExercise.titleEn
              }`}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              top: "20%",
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
            urls={[`${process.env.REACT_APP_CDN_URL}${nextExercise.filename}`]}
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
