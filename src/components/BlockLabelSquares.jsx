import { Typography } from "@mui/joy"

const BlockLabelSquares = ({
  totalDuration,
  onTime,
  relaxTime,
  draft,
  exercises,
}) => {
  const exercisesCount = (totalDuration * 60) / (onTime + relaxTime)

  return (
    <div style={{ display: "flex", gap: 5, marginBottom: 20, marginTop: 10 }}>
      <div
        style={{
          backgroundColor: "rgb(213, 220, 110)",
          padding: 5,
          width: 60,
          textAlign: "center",
        }}
      >
        <Typography level="title-md">{totalDuration}</Typography>
        <Typography level="body-sm">munites</Typography>
        <Typography level="body-sm">duration</Typography>
      </div>
      <div
        style={{
          backgroundColor: "rgba(110,220,120,1)",
          padding: 5,
          width: 60,
          textAlign: "center",
        }}
      >
        <Typography level="title-md">{onTime}</Typography>
        <Typography level="body-sm">seconds</Typography>
        <Typography level="body-sm">ON</Typography>
      </div>
      <div
        style={{
          backgroundColor: "rgba(225,180,180,1)",
          padding: 5,
          textAlign: "center",
          width: 60,
        }}
        level="title-sm"
      >
        <Typography level="title-md">{relaxTime}</Typography>
        <Typography level="body-sm">seconds</Typography>
        <Typography level="body-sm">RELAX</Typography>
      </div>
      <div
        style={{
          backgroundColor: "rgb(213, 220, 110)",
          padding: "5px",
          width: 70,
          textAlign: "center",
        }}
      >
        <Typography level="title-md">{exercises?.length}</Typography>
        <Typography level="body-sm">exercises</Typography>
        <Typography level="body-sm">{`of ${exercisesCount}`}</Typography>
      </div>
    </div>
  )
}

export default BlockLabelSquares
