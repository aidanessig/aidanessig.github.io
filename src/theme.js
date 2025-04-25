// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#1c1c1c", // page background
      paper: "#121212",   // card/paper background
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontWeightRegular: 400,
    h6: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1.1rem",
      fontWeight: 400,
    },
    button: {
      fontSize: "1.1rem",
      fontWeight: 400,
      textTransform: "none",
    },
  },
});

export default theme;
