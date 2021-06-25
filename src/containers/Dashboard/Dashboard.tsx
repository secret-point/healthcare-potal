import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      Dashboard
    </Grid>
  );
}
