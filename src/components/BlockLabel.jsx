import { Typography } from "@mui/joy"

const BlockLabel = ({
  titleEn,
  titleRu,
  onTime,
  relaxTime,
  totalDuration,
  exercisesIds,
  draft,
  onClick,
}) => {
  const exercisesCount = (totalDuration * 60) / (onTime + relaxTime)

  return (
    <div
      style={{ width: "100%", display: "block", paddingBottom: 10 }}
      onClick={onClick}
    >
      <div style={{ maxWidth: 100 }}>
        <Typography level="title-lg">{titleEn}</Typography>
        <Typography level="body-md">{titleRu}</Typography>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
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
            <Typography level="title-md">
              {exercisesIds?.length || 0}
            </Typography>
            <Typography level="body-sm">{`of ${exercisesCount}`}</Typography>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgb(213, 220, 110)",
              padding: "5px",
              width: 60,
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
    </div>
  )
}

export default BlockLabel
