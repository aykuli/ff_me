import { Alert, AlertTitle, Typography } from "@mui/material"

const DraftBlockAlert = ({ block }) => {
  return (
    <Alert variant="outlined" severity="warning">
      <AlertTitle>{`${block.exercisesIds.length} of ${block.exercisesCount} exercises chosen`}</AlertTitle>
      You are currently choosing exercises for block:
      <Typography component={"p"}>{block.titleEn}</Typography>
      <Typography component={"p"}>{block.titleRu}</Typography>
      <Typography component={"p"}>{`ON: ${block.onTime}`}</Typography>
      <Typography component={"p"}>{`RELAX: ${block.relaxTime}`}</Typography>
    </Alert>
  )
}

export default DraftBlockAlert
