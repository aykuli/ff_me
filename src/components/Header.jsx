import { Container, Button, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import { menuRoutes } from "../routes"
import { useNavigate } from "react-router-dom"

const Header = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(Boolean(anchorEl))

  const handleClick = (e) => setAnchorEl(e.currentTarget)
  const navigate = useNavigate()

  return (
    <Container maxWidth="md" style={{ marginTop: "60px" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setOpen(false)}
      >
        {menuRoutes.map(({ route, title }) => {
          return (
            <MenuItem id={title} onClick={() => navigate(route)}>
              {title}
            </MenuItem>
          )
        })}
      </Menu>
      {children}
    </Container>
  )
}

export default Header
