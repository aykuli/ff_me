import React, { useState, useEffect } from "react"
import { Button, Box, TextField, Dialog, DialogTitle } from "@mui/material"
import { styled } from "@mui/material/styles"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const AddModal = ({ onClose, open }) => {
  useEffect(() => {
    if (open) {
      // fetch file
      //draw it here
    }
  }, [open])

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Create exercise</DialogTitle>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="title_en" variant="outlined" />
        <TextField id="filled-basic" label="title_ru" variant="filled" />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
      </Box>
    </Dialog>
  )
}

export default AddModal
