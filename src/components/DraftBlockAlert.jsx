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
      <AlertTitle>{`${block.exercises?.length} of ${exercisesCount} exercises chosen`}</AlertTitle>
      You are currently choosing exercises for{" "}
      <Button
        onClick={() => navigate(`blocks/${block.id}`)}
      >{`block with id=${block.id}`}</Button>
      block:
      <Typography component={"p"} variant="h6">
        {block.titleEn}
      </Typography>
      <Typography component={"p"} variant="h6">
        {block.titleRu}
      </Typography>
      <div style={{ marginBottom: 10 }}></div>
      <Typography component={"p"}>{`ON: ${block.onTime}`}</Typography>
      <Typography component={"p"}>{`RELAX: ${block.relaxTime}`}</Typography>
      {block.exercises?.map((e, idx) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: idx === 0 ? 20 : 10,
              paddingBottom: 5,
              borderBottom: "1px solid grey",
            }}
          >
            <div style={{ width: 30 }}>{e.id}</div>
            <div style={{ flexGrow: 1 }}>
              <div>{e.titleEn}</div>
              <div>{e.titleRu}</div>
              {e.side ? (
                <span
                  style={{ backgroundColor: "#d2cfcf", padding: "2px 5px" }}
                >
                  {e.side}
                </span>
              ) : null}
            </div>
            <div style={{ width: 50 }}>
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
