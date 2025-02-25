import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import Container from "@mui/material/Container"

const VideoPlayer = ({ urls }) => {
  const [currIdx, setCurrIdx] = useState(0)
  const playerRef = useRef(null)

  const handleEnd = () => {
    setCurrIdx((prevIndex) => (prevIndex + 1 < urls.length ? prevIndex + 1 : 0))
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <ReactPlayer
        ref={playerRef}
        url={urls[currIdx]}
        playing={false}
        controls={true}
        width="100%"
        height="100%"
        onEnded={handleEnd}
      />
    </Container>
  )
}

export default VideoPlayer
