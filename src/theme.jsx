import { createTheme } from "@mui/material/styles"

const materialTheme = createTheme({
  palette: {
    mode: "dark",
  },
  primary: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ff7961",
    main: "#f44336",
    dark: "#ba000d",
    contrastText: "#000",
  },
  typography: { fontSize: "14px" },
})

export { materialTheme }
