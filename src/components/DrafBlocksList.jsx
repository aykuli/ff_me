import { useEffect, useContext, useState } from "react"
import axios from "axios"

import {
  Accordion,
  AccordionGroup,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/joy"
import { Box } from "@mui/material"
import { SimCardAlert } from "@mui/icons-material"

import AuthContext from "../context"
import DraftBlock from "./DraftBlock"

const DraftBlocksList = () => {
  const { token, snackbar } = useContext(AuthContext)
  const { setOpen, setMsg, setType } = snackbar

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
        <Box sx={{ width: "100%", mb: 4 }}>
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
                {draftBlocks?.map((block, index) => {
                  return (
                    <DraftBlock
                      {...{ block, last: index + 1 === draftBlocks?.length }}
                    />
                  )
                })}
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </Box>
      ) : null}
    </>
  )
}

export default DraftBlocksList
