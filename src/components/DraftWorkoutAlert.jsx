import { Close } from "@mui/icons-material"
import {
  Alert,
  AlertTitle,
  Button,
  IconButton,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const DraftWorkoutAlert = ({
  workout,
  deleteWorkoutBlock,
  setDraftWorkout,
}) => {
  const navigate = useNavigate()
  const workoutDuration = workout.blocks?.reduce(
    (acc, curr) => acc + curr.totalDuration,
    0
  )

  return (
    <Alert
      variant="outlined"
      severity="info"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => setDraftWorkout(null)}
        >
          <Close fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>{`Workout duration ${workoutDuration} minutes`}</AlertTitle>
      You are currently choosing blocks for{" "}
      <Button
        onClick={() => navigate(`workouts/${workout.id}`)}
      >{`workout with id=${workout.id}`}</Button>
      <Typography component={"p"} variant="h6">
        {`Title en ${workout.titleEn}`}{" "}
      </Typography>
      <Typography component={"p"} variant="h6">
        {`Title ru ${workout.titleRu}`}
      </Typography>
      <div style={{ marginBottom: 10 }}></div>
      {workout.blocks?.map((b, idx) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: idx === 0 ? 20 : 10,
              paddingBottom: 5,
              borderBottom:
                idx === workout.blocks?.length - 1
                  ? undefined
                  : "1px solid grey",
            }}
          >
            <div style={{ width: 30 }}>{b.id}</div>
            <div style={{ flexGrow: 1 }}>
              <div>{b.titleEn}</div>
              <div>{b.titleRu}</div>
            </div>
            <div style={{ width: 50 }}>
              <IconButton
                size="small"
                color="info"
                onClick={() => deleteWorkoutBlock(b)}
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

export default DraftWorkoutAlert
