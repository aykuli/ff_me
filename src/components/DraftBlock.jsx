import { NavLink } from "react-router"

import { useTheme } from "@mui/material"
import { ListItemContent, Avatar, Typography } from "@mui/joy"
import { Divider } from "@mui/material"
import {
  AccessibilityNewRounded,
  Timer,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material"

const DraftBlock = ({ block, last }) => {
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
  const theme = useTheme()

  return (
    <div key={id} style={{ marginTop: 10 }}>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <Avatar color="warning">
          <AccessibilityNewRounded />
        </Avatar>

        <ListItemContent>
          <NavLink
            to={`blocks/${id}`}
            end
            style={{ color: theme.palette.primary.dark }}
          >
            <Typography level="title-md">{titleEn}</Typography>
          </NavLink>
          <NavLink
            to={`blocks/${id}`}
            end
            style={{ color: theme.palette.primary.dark }}
          >
            <Typography level="body-sm">{titleRu}</Typography>
          </NavLink>
        </ListItemContent>
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
