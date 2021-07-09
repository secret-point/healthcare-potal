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
    allVariants: {
      color: "#183F4F",
    },
  },
  palette: {
    primary: {
      main: "#DAEFED",
    },
    backgroundGreen: {
      main: "#F8FAF8",
    },
    primaryNavy: {
      main: "#183F4F",
    },
    primaryGreen: {
      main: "#92be71",
    },
    secondaryGreen1: {
      main: "#6D9147",
    },
    secondaryGreen2: {
      main: "#BBDC9C",
    },
    secondaryMint1: {
      main: "#278c79",
    },
    secondaryMint2: {
      main: "#A3D9CF",
    },
    secondaryNavy1: {
      main: "#456772",
    },
    secondaryNavy2: {
      main: "#7C989B",
    },
    backgroundMint: {
      main: "#DAEFED",
    },
    backgroundGray: {
      main: "#F2F2F2",
    },
    accentRed: {
      main: "#EB5757",
    },
    accentYellow: {
      main: "#FFE68F",
    },
    yellow: {
      main: "#FFE68F",
    },
    distinctiveGray: {
      main: "#E3E3E3",
    },
    backgroundRed: {
      main: "#FEDEDE",
    },
    contrastThreshold: 3,
  },
});
