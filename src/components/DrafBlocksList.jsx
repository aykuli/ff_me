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
  Sheet,
} from "@mui/joy"
import { Alert, Box, Divider, Typography } from "@mui/material"
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
          <Alert color="warning">You have draft blocks</Alert>
          <AccordionGroup size="sm" variant="plain">
            <Accordion>
              <AccordionSummary>Draft blocks</AccordionSummary>
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
                      <div key={id} color="info" variant="outlined">
                        <NavLink
                          to={`blocks/${id}`}
                          end
                          style={{ color: theme.palette.primary.dark }}
                        >
                          <p>{titleEn}</p>
                        </NavLink>
                        <NavLink
                          to={`blocks/${id}`}
                          end
                          style={{ color: theme.palette.primary.dark }}
                        >
                          <p>{titleRu}</p>
                        </NavLink>
                        <p>{`${totalDuration} minutes duration`}</p>
                        <p>{`${onTime} seconds ON`}</p>
                        <p>{`${relaxTime} seconds ON`}</p>
                        <p>{`${exercisesIds?.length} of ${totalExercises} chosen`}</p>

                        <p>{`created at ${createdAt}`}</p>
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

      <Divider />
    </>
  )
}

export default DraftBlocksList
