import { Close } from "@mui/icons-material"
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const DraftBlockAlert = ({ block, deleteBlockExercise }) => {
  const exercisesCount =
    (block.totalDuration * 60) / (block.onTime + block.relaxTime)
  const navigate = useNavigate()

  return (
    <Alert variant="outlined" severity="warning">
      <AlertTitle>{`${block.exercisesIds.length} of ${exercisesCount} exercises chosen`}</AlertTitle>
      You are currently choosing exercises for{" "}
      <Button
        onClick={() => navigate(`blocks/${block.id}`)}
      >{`block with id=${block.id}`}</Button>
      block:
      <Typography component={"p"}>{block.titleEn}</Typography>
      <Typography component={"p"}>{block.titleRu}</Typography>
      <Typography component={"p"}>{`ON: ${block.onTime}`}</Typography>
      <Typography component={"p"}>{`RELAX: ${block.relaxTime}`}</Typography>
      {block.exercises?.map((e, idx) => {
        return (
          <div
            style={{
              display: "flex",
              flex: "0 0 50%",
              alignItems: "center",
              marginTop: idx === 0 ? 10 : 2,
            }}
          >
            <div style={{width: 20}}>{idx}</div>
            <div style={{width: 100, marginRight: 10}}>{e.titleEn}</div>
            <div style={{width: 100, marginRight: 10}}>{e.titleRu}</div>
            <div>
              <IconButton
                size="small"
                color="info"
                onClick={() => deleteBlockExercise(e)}
                sx={{ p: 0 }}
              >
                <Close />
              </IconButton>
            </div>
          </div>
        )
      })}
    </Alert>
  )
}

export default DraftBlockAlert
