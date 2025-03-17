import { useEffect, useContext, useState } from "react"
import { NavLink } from "react-router"
import { useLocation } from "react-router-dom"
import axios from "axios"

import { useTheme } from "@mui/material"
import {
  Accordion,
  AccordionGroup,
  AccordionDetails,
  AccordionSummary,
  ListItemContent,
  Avatar,
  Typography,
} from "@mui/joy"
import { Box, Divider } from "@mui/material"
import {
  SimCardAlert,
  AccessibilityNewRounded,
  Timer,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material"

import AuthContext from "../context"

const DraftBlocksList = () => {
  const { token, draftBlock, setDraftBlock, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar
  const theme = useTheme()

  const [draftBlocks, setBlocks] = useState([])

  useEffect(() => {
    if (!token) {
      return
    }

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/blocks/list`,
      data: { draft: true },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    })
      .then((response) => {
        setBlocks(response.data)
      })
      .catch((e) => {
        setOpen(true)
        setType("error")
        setMsg("Server exercises fetch error")
      })
  }, [token, setType, setMsg, setOpen])

  return (
    <>
      {draftBlocks.length > 0 ? (
        <Box sx={{ width: "100%", mb: 1 }}>
          <AccordionGroup size="sm" variant="soft" color="warning">
            <Accordion>
              <AccordionSummary>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar color="warning">
                    <SimCardAlert color="warning" />
                  </Avatar>
                  <Typography component={"span"}>
                    You have draft blocks
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {draftBlocks?.map(
                  ({
                    id,
                    titleEn,
                    titleRu,
                    totalDuration,
                    onTime,
                    relaxTime,
                    exercisesIds,
                    createdAt,
                  }) => {
                    const totalExercises =
                      (totalDuration * 60) / (onTime + relaxTime)
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
                              <Typography level="title-md">
                                {titleEn}
                              </Typography>
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              marginBottom: 10,
                              marginRight: 10,
                            }}
                          >
                            <Timer color="warning" />
                            <span>{`${totalDuration} minutes duration`}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              marginBottom: 10,
                              marginRight: 10,
                            }}
                          >
                            <RadioButtonChecked color="success" />
                            <span>{`${onTime} seconds`}</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              marginBottom: 10,
                              marginRight: 10,
                            }}
                          >
                            <RadioButtonUnchecked color="success" />
                            <span>{`${relaxTime} seconds`}</span>
                          </div>

                          <div>
                            <span style={{ fontWeight: 900 }}>
                              {exercisesIds?.length || 0}
                            </span>
                            <span> of </span>
                            <span style={{ fontWeight: 900 }}>
                              {totalExercises}
                            </span>
                            <span> exercises chosen</span>
                          </div>
                          <p>{`created at ${createdAt}`}</p>
                        </div>
                        <Divider />
                      </div>
                    )
                  }
                )}
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Box>
      ) : null}
    </>
  )
}

export default DraftBlocksList
