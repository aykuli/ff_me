import { IconButton } from "@mui/material"
import { ListItemButton, Avatar, Typography } from "@mui/joy"
import { Divider } from "@mui/material"
import {
  AccessibilityNewRounded,
  Timer,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Flaky,
} from "@mui/icons-material"

const DraftBlock = ({ block, last, markReady, onClick }) => {
  const {
    id,
    titleEn,
    titleRu,
    totalDuration,
    onTime,
    relaxTime,
    exercisesIds,
    createdAt,
  } = block
  const totalExercises = (totalDuration * 60) / (onTime + relaxTime)

  return (
    <div key={id} style={{ marginTop: 10 }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Avatar color="warning">
          <AccessibilityNewRounded />
        </Avatar>

        <ListItemButton onClick={onClick} sx={{ display: "block" }}>
          <Typography level="title-md">{titleEn}</Typography>
          <Typography level="body-sm">{titleRu}</Typography>
        </ListItemButton>
        {totalExercises === exercisesIds.length && (
          <IconButton color="success" onClick={() => markReady(id)}>
            <Flaky />
          </IconButton>
        )}
      </div>
      <div style={{ marginLeft: 39 }}>
        <Div>
          <Timer color="warning" />
          <span>{`${totalDuration} minutes duration`}</span>
        </Div>
        <Div>
          <RadioButtonChecked color="success" />
          <span>{`${onTime} seconds`}</span>
        </Div>
        <Div>
          <RadioButtonUnchecked color="success" />
          <span>{`${relaxTime} seconds`}</span>
        </Div>

        <div>
          <span style={{ fontWeight: 900 }}>{exercisesIds?.length || 0}</span>
          <span> of </span>
          <span style={{ fontWeight: 900 }}>{totalExercises}</span>
          <span> exercises chosen</span>
        </div>
        <p>{`created at ${createdAt}`}</p>
      </div>

      {last ? null : <Divider />}
    </div>
  )
}

export default DraftBlock

const Div = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        marginBottom: 10,
        marginRight: 10,
      }}
    >
      {children}
    </div>
  )
}
