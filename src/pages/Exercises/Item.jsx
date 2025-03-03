import React, { useState, useEffect, use } from "react"
import { ButtonGroup, Button } from "@mui/material"

const Item = ({ open }) => {
  useEffect(() => {
    if (open) {
      // fetch file
      //draw it here
    }
  }, [open])

  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
}

export default Item
