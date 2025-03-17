import { useNavigate } from "react-router-dom"
import { Typography } from "@mui/joy"
import Squares from "./BlockLabelSquares"

const BlockLabel = ({
  id,
  titleEn,
  titleRu,
  onTime,
  relaxTime,
  totalDuration,
  exercisesIds,
  draft,
  onClick,
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blocks/${id}`)
  }

  return (
    <div
      style={{ width: "100%", display: "block", paddingBottom: 10 }}
      onClick={onClick}
    >
      <div onClick={handleClick}>
        <Typography level="title-lg">{titleEn}</Typography>
        <Typography level="body-md">{titleRu}</Typography>
      </div>
      <Squares
        {...{
          totalDuration,
          onTime,
          relaxTime,
          draft,
          exercisesIds,
        }}
      />
    </div>
  )
}

export default BlockLabel
