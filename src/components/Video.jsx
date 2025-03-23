import React, { useRef } from "react"
import ReactPlayer from "react-player"

const VideoPlayer = ({ urls }) => {
  const playerRef = useRef(null)

  return (
    <ReactPlayer
      ref={playerRef}
      url={urls[0]}
      playing
      controls={true}
      width="100%"
      height="100%"
      loop
      volume={0}
    />
  )
}

export default VideoPlayer
