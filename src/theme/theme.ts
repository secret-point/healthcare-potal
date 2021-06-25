import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand, Sans Serif",
    fontWeightRegular: 450,
    fontWeightMedium: 600,
    fontWeightBold: 750,
    body1: {
      fontWeight: 450,
    },
  },
  palette: {
    blue: {
      main: "#005FFA",
    },
    contrastThreshold: 3,
  },
});
