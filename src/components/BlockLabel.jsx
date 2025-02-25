import { Typography } from "@mui/joy"

const BlockLabel = ({ title, onTime, relaxTime }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography level="title-lg">{title}</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          gap: 10,
        }}
      >
        <Typography
          style={{
            backgroundColor: "rgba(110,220,120,1)",
            padding: "5px 10px 5px 10px",
            width: 45,
          }}
          level="title-sm"
        >{`ON ${onTime} `}</Typography>
        <Typography
          style={{
            backgroundColor: "rgba(225,180,180,1)",
            padding: "5px 10px 5px 10px",
            width: 70,
          }}
          level="title-sm"
        >{`RELAX ${relaxTime}`}</Typography>
      </div>
    </div>
  )
}

export default BlockLabel
