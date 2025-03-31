import { useNavigate } from "react-router-dom"
import { Typography } from "@mui/joy"

import Squares from "./BlockLabelSquares"

const BlockLabel = ({ block }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blocks/${block.id}`)
  }

  return (
    <div
      style={{ width: "100%", display: "block", paddingBottom: 10 }}
      // onClick={showExercises}
      title="show exercises"
    >
      <div onClick={handleClick} title="go to page with block">
        <Typography level="title-lg">{block.titleEn}</Typography>
        <Typography level="body-md">{block.titleRu}</Typography>
      </div>
      <Squares {...block} />
    </div>
  )
}

export default BlockLabel
