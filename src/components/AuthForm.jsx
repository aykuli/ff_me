import {
  Button,
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const AuthForm = (props) => {
  const { onSave, data } = props
  const { login, password } = data
  const { isError, setIsError, isSent } = props
  const { setLogin, pwdInputType, setPassword, setPwdInputType } = props

  return (
    <Container style={{ paddingTop: "1vh"}}>
      <Box
        component="form"
        onSubmit={onSave}
        sx={{ maxWidth: 250, margin: "auto" }}
      >
        <div>
          {isError && (
            <FormHelperText error={isError} id="error-login">
              Maybe wrong here
            </FormHelperText>
          )}
          <TextField
            error={isError}
            sx={{ width: "100%", mb: 2 }}
            id="login"
            label="login"
            variant="standard"
            value={login}
            onChange={(input) => {
              setIsError(false)
              setLogin(input.currentTarget.value)
            }}
          />
        </div>
        <div>
          {isError && (
            <FormHelperText error={isError} id="error-pswrd">
              or here
            </FormHelperText>
          )}
          <TextField
            error={isError}
            sx={{ width: "100%", mb: 4 }}
            type={pwdInputType}
            id="password"
            label="password"
            variant="standard"
            value={password}
            onChange={(input) => {
              setIsError(false)
              setPassword(input.currentTarget.value)
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setPwdInputType(
                          pwdInputType === "password" ? "text" : "password"
                        )
                      }}
                      edge="end"
                    >
                      {pwdInputType === "password" ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div>
          <Button
            sx={{ margin: "auto", width: "100%", p: 2 }}
            type="submit"
            variant="contained"
            disabled={login === "" || password === "" || isError || isSent}
          >
            {isSent ? "Loading" : "Submit"}
          </Button>
        </div>
      </Box>
    </Container>
  )
}

export default AuthForm
