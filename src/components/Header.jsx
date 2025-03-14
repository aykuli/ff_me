import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

import {
  Box,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import { Logout, OtherHouses } from "@mui/icons-material"
import { Typography } from "@mui/joy"

import { menuRoutes } from "../routes"
import AuthContext from "../context"
import DraftBlockAlert from "./DraftBlockAlert"

const Header = ({ children }) => {
  const { token, setToken, draftBlock } = useContext(AuthContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(Boolean(anchorEl))
  const [currRoute, setCurrRoute] = useState("")
  const [currTitle, setCurrTitle] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrRoute(location.pathname)

    const filtered = menuRoutes.find(({ route }) => route === location.pathname)
    if (filtered?.title) {
      setCurrTitle(filtered.title)
    }
  }, [location])

  const logout = () => {
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}/logout`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: token,
      },
    }).finally(() => {
      localStorage.clear(process.env.REACT_APP_TOKEN_LS_NAME)
      setToken(null)
      navigate("/login")
    })
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "5vw" }}>
      <Box
        sx={{
          width: "calc(100%-",
          maxWidth: 640,
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
        }}
      >
        {draftBlock && <DraftBlockAlert block={draftBlock} />}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            edge="end"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => {
              setAnchorEl(open ? null : e.currentTarget)
              setOpen(!open)
            }}
          >
            <OtherHouses />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={() => logout()}
          >
            <Logout />
          </IconButton>
        </div>
        <Divider style={{ marginBottom: "3vh" }} />
        <Typography level="h3" style={{ marginBottom: "2vh" }}>
          {currTitle}
        </Typography>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setOpen(false)}
        >
          {menuRoutes.map(({ route, title }) => {
            return (
              <MenuItem
                disabled={route === currRoute}
                id={title}
                onClick={() => navigate(route)}
              >
                {title}
              </MenuItem>
            )
          })}
        </Menu>
        {children}
      </Box>
    </Container>
  )
}

export default Header
