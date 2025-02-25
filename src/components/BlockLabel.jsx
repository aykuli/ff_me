import { Typography } from "@mui/joy"

const BlockLabel = ({ title, onTime, relaxTime }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography level="h2">{title}</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          flexDirection: "column",
        }}
      >
        <Typography
          style={{ backgroundColor: "rgba(110,220,120,1)" }}
          level="p"
        >{`ON ${onTime} `}</Typography>
        <Typography
          style={{ backgroundColor: "rgba(225,180,180,1)" }}
          level="p"
        >{`RELAX ${relaxTime}`}</Typography>
      </div>
    </div>
  )
}

export default BlockLabel
