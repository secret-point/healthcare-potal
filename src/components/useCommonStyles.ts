import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "src/theme/types/createPalette";

export const useCardStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      card: {
        height: "100%",
        padding: theme.spacing(3),
        borderRadius: theme.spacing(1.5),
        borderColor: theme.palette.secondaryGreen1.main,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      },
      grayBorder: {
        borderColor: theme.palette.distinctiveGray.main,
      },
    }),
  { index: 1 }
);

export const useFontStyles = makeStyles(
  () =>
    createStyles({
      fontBolder: {
        fontWeight: 700,
      },
      fontBold: {
        fontWeight: 600,
      },
      font500: {
        fontWeight: 500,
      },
      fontNormal: {
        fontWeight: 400,
      },
      noneTextDecoration: {
        textDecoration: "none",
      },
      lineHeight15: {
        lineHeight: 1.5,
      },
    }),
  { index: 1 }
);

export const useColorStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      white: {
        color: "#ffffff",
      },
      primary: {
        color: theme.palette.primary.main,
      },
      disabled: {
        color: theme.palette.disabled.main,
      },
      backgroundGreen: {
        color: theme.palette.backgroundGreen.main,
      },
      primaryNavy: {
        color: theme.palette.primaryNavy.main,
      },
      primaryGreen: {
        color: theme.palette.primaryGreen.main,
      },
      secondaryGreen1: {
        color: theme.palette.secondaryGreen1.main,
      },
      secondaryGreen2: {
        color: theme.palette.secondaryGreen2.main,
      },
      secondaryMint1: {
        color: theme.palette.secondaryMint1.main,
      },
      secondaryMint2: {
        color: theme.palette.secondaryMint2.main,
      },
      secondaryNavy1: {
        color: theme.palette.secondaryNavy1.main,
      },
      secondaryNavy2: {
        color: theme.palette.secondaryNavy2.main,
      },
      backgroundMint: {
        color: theme.palette.backgroundMint.main,
      },
      backgroundGray: {
        color: theme.palette.backgroundGray.main,
      },
      accentRed: {
        color: theme.palette.accentRed.main,
      },
      accentYellow: {
        color: theme.palette.accentYellow.main,
      },
      yellow: {
        color: theme.palette.yellow.main,
      },
      distinctiveGray: {
        color: theme.palette.distinctiveGray.main,
      },
      backgroundRed: {
        color: theme.palette.backgroundRed.main,
      },
    }),
  { index: 1 }
);

export const useBackgroundColorStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      white: {
        backgroundColor: "#ffffff",
      },
      primary: {
        backgroundColor: theme.palette.primary.main,
      },
      disabled: {
        backgroundColor: theme.palette.disabled.main,
      },
      backgroundGreen: {
        backgroundColor: theme.palette.backgroundGreen.main,
      },
      primaryNavy: {
        backgroundColor: theme.palette.primaryNavy.main,
      },
      primaryGreen: {
        backgroundColor: theme.palette.primaryGreen.main,
      },
      secondaryGreen1: {
        backgroundColor: theme.palette.secondaryGreen1.main,
      },
      secondaryGreen2: {
        backgroundColor: theme.palette.secondaryGreen2.main,
      },
      secondaryMint1: {
        backgroundColor: theme.palette.secondaryMint1.main,
      },
      secondaryMint2: {
        backgroundColor: theme.palette.secondaryMint2.main,
      },
      secondaryNavy1: {
        backgroundColor: theme.palette.secondaryNavy1.main,
      },
      secondaryNavy2: {
        backgroundColor: theme.palette.secondaryNavy2.main,
      },
      backgroundMint: {
        backgroundColor: theme.palette.backgroundMint.main,
      },
      backgroundGray: {
        backgroundColor: theme.palette.backgroundGray.main,
      },
      accentRed: {
        backgroundColor: theme.palette.accentRed.main,
      },
      accentYellow: {
        backgroundColor: theme.palette.accentYellow.main,
      },
      yellow: {
        backgroundColor: theme.palette.yellow.main,
      },
      distinctiveGray: {
        backgroundColor: theme.palette.distinctiveGray.main,
      },
      backgroundRed: {
        backgroundColor: theme.palette.backgroundRed.main,
      },
      backgroundYellow: {
        backgroundColor: theme.palette.backgroundYellow.main,
      },
    }),
  { index: 1 }
);

export const useLayoutStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      mb05: {
        marginBottom: theme.spacing(0.5),
      },
      mb1: {
        marginBottom: theme.spacing(1),
      },
      mb15: {
        marginBottom: theme.spacing(1.5),
      },
      mb2: {
        marginBottom: theme.spacing(2),
      },
      mb3: {
        marginBottom: theme.spacing(3),
      },
      mb4: {
        marginBottom: theme.spacing(4),
      },
      mb5: {
        marginBottom: theme.spacing(5),
      },
      mb6: {
        marginBottom: theme.spacing(6),
      },
      mb8: {
        marginBottom: theme.spacing(8),
      },
      ml05: {
        marginLeft: theme.spacing(0.5),
      },
      ml1: {
        marginLeft: theme.spacing(1),
      },
      ml15: {
        marginLeft: theme.spacing(1.5),
      },
      ml2: {
        marginLeft: theme.spacing(2),
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
      mt6: {
        marginTop: theme.spacing(6),
      },
      pl1: {
        paddingLeft: theme.spacing(1),
      },
      pl2: {
        paddingLeft: theme.spacing(2),
      },
      pl3: {
        paddingLeft: theme.spacing(3),
      },
      pl4: {
        paddingLeft: theme.spacing(4),
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
      pt4: {
        paddingTop: theme.spacing(4),
      },
      pb0: {
        paddingBottom: theme.spacing(0),
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
      pb4: {
        paddingBotom: theme.spacing(4),
      },
      padding1: {
        padding: theme.spacing(3),
      },
      padding2: {
        padding: theme.spacing(2),
      },
      padding3: {
        padding: theme.spacing(3),
      },
      padding4: {
        padding: theme.spacing(4),
      },
      noPadding: {
        padding: 0,
      },
      noMargin: {
        margin: 0,
      },
      fullHeight: {
        height: "100%",
      },
      center: {
        alignItems: "center",
        justifyContent: "center",
      },
      gap3: {
        gap: theme.spacing(3),
      },
    }),
  { index: 1 }
);
