import React, { useState, useEffect } from "react"
import { ButtonGroup, Button } from "@mui/material"

const Item = () => {
  return (
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  )
}

export default Item
