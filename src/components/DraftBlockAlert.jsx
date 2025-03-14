import { Alert, AlertTitle, Typography } from "@mui/material"

const DraftBlockAlert = ({ block }) => {
  return (
    <Alert variant="outlined" severity="warning">
      <AlertTitle>{`${block.exercisesIds.length} of ${block.exercisesCount}`}</AlertTitle>
      You are currently choosing exercises for block:
      <Typography component={"p"}>{block.TitleEn}</Typography>
      <Typography component={"p"}>{block.TitleRu}</Typography>
      <Typography component={"p"}>{`ON: ${block.OnTime}`}</Typography>
      <Typography component={"p"}>{`RELAX: ${block.RelaxTime}`}</Typography>
    </Alert>
  )
}

export default DraftBlockAlert
