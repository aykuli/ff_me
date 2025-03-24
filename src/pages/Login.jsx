import React, { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

import { Container } from "@mui/material"

import AuthForm from "../components/AuthForm"
import ProtectedRoute from "../components/ProtectedRoute"

import AuthContext from "../context"

const Login = () => {
  const { setToken } = useContext(AuthContext)

  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [pwdInputType, setPwdInputType] = useState("password")
  const [isSent, setIsSent] = useState(false)
  const [isRedirect, setIsRedirect] = useState(false)
  const [isError, setIsError] = useState(false)

  const sendCredentials = async (e) => {
    e.preventDefault()
    setIsSent(true)

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: { login, password },
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // todo change
      },
    })
      .then((response) => {
        if (response.data.token) {
          setToken(`Bearer token=${response.data.token}`)
          setIsRedirect(true)
        }
        setIsRedirect(true)
      })
      .catch((e) => {
        setIsError(true)
      })
      .finally(() => {
        setIsSent(false)
      })
  }

  return (
    <>
      <ProtectedRoute />
      <Container style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
        {isRedirect && <Navigate to="/" replace />}
        <AuthForm
          onSave={sendCredentials}
          data={{ login, password }}
          {...{
            isError,
            setIsError,
            setLogin,
            pwdInputType,
            setPassword,
            setPwdInputType,
            isSent,
          }}
        />
      </Container>
    </>
  )
}

export default Login
