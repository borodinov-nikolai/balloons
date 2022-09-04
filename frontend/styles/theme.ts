import { createTheme, responsiveFontSizes } from "@mui/material/styles"

let theme = createTheme({
  palette: {
    primary: {
      main: "#D4AA00",
      light: "#fcce56",
    },
    secondary: {
      main: "#0000FF",
      dark: "#11119d",
    },
  },
  typography: {
    fontFamily: ["Gilroy", "Bebas Neue", "Termina"].join(","),
    h2: {
      fontSize: "4rem",
      fontFamily: "Bebas Neue",
      fontWeight: 700,
      textAlign: "left",
    },
    h3: {
      fontSize: "2rem",
      fontFamily: "Bebas Neue",
      fontWeight: 700,
      textAlign: "left",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.22rem",
      color: "#052525",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.22rem",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
      styleOverrides: {
        containedPrimary: {
          fontWeight: "bold",
          color: "white",
          "&:hover": { background: "#eac070" },
        },
        containedSecondary: {
          fontWeight: "bold",
          color: "white",
          "&:hover": { background: "#11119d" },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "standard" },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#d32f2f",
          marginLeft: 0,
          position: "absolute",
          bottom: "-1.5rem",
        },
      },
    },
  },
})

theme = responsiveFontSizes(theme)

export default theme
