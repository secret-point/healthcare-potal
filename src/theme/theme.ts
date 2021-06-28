import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "DM Sans, Quicksand, Sans Serif",
    fontWeightRegular: 450,
    fontWeightMedium: 600,
    fontWeightBold: 750,
    h1: {
      fontSize: 32,
      fontWeight: 600,
    },
    h2: {
      fontSize: 24,
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
    },
    h5: {
      fontSize: 16,
      fontWeight: 600,
    },
    h6: {
      fontSize: 16,
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#DAEFED",
    },
    blue: {
      main: "#005FFA",
    },
    backgroundGreen: {
      main: "#F8FAF8",
    },
    border: {
      main: "#E3E3E3",
    },
    inputColor: {
      main: "#7C989B",
    },
    textColor: {
      main: "#183F4F",
    },
    linkColor: {
      main: "#6D9147",
    },
    contrastThreshold: 3,
  },
});
