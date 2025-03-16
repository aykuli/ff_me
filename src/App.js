import { useEffect, useState } from "react"
import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"

import "./index.css"
import routes from "./routes"
import ProtectedRoute from "./components/ProtectedRoute"
import { materialTheme } from "./theme"

export const AuthContext = createContext({ token: null, setToken: null })

const App = () => {
  const [token, setToken] = useState(null)
  const [draftBlock, setDraftBlock] = useState(null)
  const addBlockExercise = (id) => {
    setDraftBlock((prev) => {
      return { ...prev, exercisesIds: [...prev.exercisesIds, id] }
    })
  }

  const [openSnackbar, setOpenSb] = useState(false)
  const [sbMsg, setSbMsg] = useState("")
  const [sbType, setSbType] = useState("success")

  useEffect(() => {
    const stToken = localStorage.getItem(process.env.REACT_APP_TOKEN_LS_NAME)
    if (stToken) {
      setToken(stToken)
    }
  }, [])

  useEffect(() => {
    if (token === null || token === undefined) {
      return
    }
    localStorage.setItem(process.env.REACT_APP_TOKEN_LS_NAME, token)
  }, [token])

  return (
    <ThemeProvider theme={materialTheme}>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          draftBlock,
          setDraftBlock,
          addBlockExercise,
          snackbar: {
            open: openSnackbar,
            setOpen: setOpenSb,
            msg: sbMsg,
            setMsg: setSbMsg,
            type: sbType,
            setType: setSbType,
          },
        }}
      >
        <RouterProvider router={routes}>
          <ProtectedRoute />
        </RouterProvider>
      </AuthContext.Provider>
    </ThemeProvider>
  )
}
export default App
