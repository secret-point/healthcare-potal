import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      display: "flex",
      width: "100%",
      height: "100%",
      minWidth: "100%",
      minHeight: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      background: `rgba(255, 255, 255, .5)`,
      alignContent: "center",
      justifyItems: "center",
      zIndex: 30,
    },
  })
);

export default function CenterLoader() {
  const classes = useStyles();

  return (
    <Box className={classes.loader}>
      <CircularProgress />
    </Box>
  );
}
