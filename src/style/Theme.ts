import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#485696",
    },
    secondary: {
      main: "#FC7A1E",
    },
    background: {
      default: "#E7E7E7",
    },
    common: {
      black: "#000000",
      white: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#8E8E8E",
      disabled: "#BBBBBB",
    },
  },
  typography: {
    h4: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
