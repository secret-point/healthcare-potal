import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "../theme/types/createPalette";

export const useCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      padding: theme.spacing(3),
      borderRadius: theme.spacing(1),
      borderColor: theme.palette.secondaryGreen1.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  })
);

export const useFontStyles = makeStyles(() =>
  createStyles({
    normalFontWeight: {
      fontWeight: 400,
    },
  })
);

export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    mb05: {
      marginBottom: theme.spacing(0.5),
    },
    mb1: {
      marginBottom: theme.spacing(1),
    },
    mb2: {
      marginBottom: theme.spacing(2),
    },
    mb3: {
      marginBottom: theme.spacing(3),
    },
    margin1: {
      marginBottom: theme.spacing(1),
    },
    margin2: {
      marginBottom: theme.spacing(2),
    },
    margin3: {
      marginBottom: theme.spacing(3),
    },
    mt05: {
      marginTop: theme.spacing(0.5),
    },
    mt1: {
      marginTop: theme.spacing(1),
    },
    mt2: {
      marginTop: theme.spacing(2),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
    pt1: {
      paddingTop: theme.spacing(1),
    },
    pt2: {
      paddingTop: theme.spacing(2),
    },
    pt3: {
      paddingTop: theme.spacing(3),
    },
    pb1: {
      paddingBottom: theme.spacing(1),
    },
    pb2: {
      paddingBottom: theme.spacing(2),
    },
    pb3: {
      paddingBotom: theme.spacing(3),
    },
    noPadding: {
      padding: 0,
    },
    noMargin: {
      padding: 0,
    },
  })
);
