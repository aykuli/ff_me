import  { useState } from "react"
import {   IconButton } from "@mui/material"
import { Stack, TextField, Typography } from "@mui/material"
import {  EditOutlined, PanoramaFishEye } from "@mui/icons-material"


function CustomLabel({
  lang,
  title,
  isEdit,
  onEdit,
  onSave,
  editable,
  ...props
}) {
  const [value, setValue] = useState(title)
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexGrow={1}
      {...props}
    >
      {isEdit ? (
        <TextField
          fullWidth
          id={title}
          label={lang}
          variant="outlined"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      ) : (
        <Typography variant="body" sx={{ fontSize: "xl", mb: 0.5, mt: 2 }}>
          {title}
        </Typography>
      )}
      {editable ? (
        <IconButton
          onClick={isEdit ? () => onSave(value) : onEdit}
          aria-label="select item"
          size="small"
        >
          {!isEdit ? (
            <EditOutlined fontSize="inherit" color="primary" />
          ) : (
            <PanoramaFishEye fontSize="inherit" color="primary" />
          )}
        </IconButton>
      ) : null}
    </Stack>
  )
}

export default CustomLabel