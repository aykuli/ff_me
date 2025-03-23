import { useState } from "react"
import { IconButton } from "@mui/material"
import { Stack, TextField, Typography } from "@mui/material"
import { EditOutlined, PanoramaFishEye } from "@mui/icons-material"

function CustomLabel({ lang, title, isEdit, onEdit, onSave, ...props }) {
  const [value, setValue] = useState(title)
  return (
    <Stack
      direction="row"
      alignItems="center"
      flexGrow={1}
      {...props}
      sx={{ mb: 0.5, mt: 1 }}
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
        <Typography variant="body">{title}</Typography>
      )}
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
    </Stack>
  )
}

export default CustomLabel
