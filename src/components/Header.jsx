import { useEffect, useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"

import {
  IconButton,
  Container,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material"
import { Logout, OtherHouses } from "@mui/icons-material"

import { menuRoutes } from "../routes"
import AuthContext from "../context"
import DraftBlockAlert from "./DraftBlockAlert"
import DraftWorkoutAlert from "./DraftWorkoutAlert"

const Header = ({ children }) => {
  const {
    token,
    setToken,
    draftBlock,
    setDraftBlock,
    draftWorkout,
    setDraftWorkout,
    deleteWorkoutBlock,
    snackbar,
    deleteBlockExercise,
  } = useContext(AuthContext)
  const { open, setOpen, msg, setMsg, type } = snackbar

  const [anchorEl, setAnchorEl] = useState(null)
  const [openMn, setOpenMn] = useState(Boolean(anchorEl))
  const [currRoute, setCurrRoute] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrRoute(location.pathname)
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
    })
      .catch((e) => {
        if (e.response.status === 403) {
          navigate("/login")
        }
      })
      .finally(() => {
        localStorage.clear(process.env.REACT_APP_TOKEN_LS_NAME)
        setToken(null)
        navigate("/login")
      })
  }

  const handleCloseSb = () => {
    setOpen(false)
    setMsg("")
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSb}>
        <Alert onClose={handleCloseSb} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <Container maxWidth="md" sx={{ mb: 8 }}>
        {currRoute === "/login" ? (
          <Typography variant="h3">Training set application</Typography>
        ) : (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              edge="end"
              aria-label="more"
              id="long-button"
              aria-controls={openMn ? "long-menu" : undefined}
              aria-expanded={openMn ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => {
                setAnchorEl(openMn ? null : e.currentTarget)
                setOpenMn(!openMn)
              }}
              size="large"
            >
              <OtherHouses />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="more"
              id="long-button"
              aria-controls={openMn ? "long-menu" : undefined}
              aria-expanded={openMn ? "true" : undefined}
              aria-haspopup="true"
              onClick={() => logout()}
            >
              <Logout />
            </IconButton>
          </div>
        )}
        <Divider style={{ marginBottom: "3vh" }} />
        {draftWorkout && (
          <>
            <DraftWorkoutAlert
              {...{
                workout: draftWorkout,
                setDraftWorkout,
                deleteWorkoutBlock,
              }}
            />
            <Divider style={{ marginBottom: "3vh" }} />
          </>
        )}

        {draftBlock && (
          <>
            <DraftBlockAlert
              block={draftBlock}
              deleteBlockExercise={deleteBlockExercise}
              setBlock={setDraftBlock}
            />
            <Divider style={{ marginBottom: "3vh" }} />
          </>
        )}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMn}
          onClose={() => setOpenMn(false)}
        >
          {menuRoutes.map(({ route, title }) => {
            return (
              <MenuItem
                disabled={route === currRoute}
                key={route}
                onClick={() => navigate(route)}
              >
                {title}
              </MenuItem>
            )
          })}
        </Menu>
        {children}
      </Container>
    </>
  )
}

export default Header
