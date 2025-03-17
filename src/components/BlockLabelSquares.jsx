import { Typography } from "@mui/joy"

const BlockLabelSquares = ({
  totalDuration,
  onTime,
  relaxTime,
  draft,
  exercisesIds,
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
        <Typography level="body-sm">RELAX</Typography>
      </div>
      {draft ? (
        <div
          style={{
            backgroundColor: "rgb(213, 220, 110)",
            padding: "5px",
            width: 60,
            textAlign: "center",
          }}
        >
          <Typography level="title-md">{exercisesIds?.length || 0}</Typography>
          <Typography level="body-sm">{`of ${exercisesCount}`}</Typography>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "rgb(213, 220, 110)",
            padding: "5px",
            width: 70,
            textAlign: "center",
          }}
        >
          <Typography level="title-md">
            {exercisesIds?.length || exercisesCount}
          </Typography>
          <Typography level="body-sm">exercises</Typography>
        </div>
      )}
    </div>
  )
}

export default BlockLabelSquares
