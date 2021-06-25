import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import PrairieIcon from "../icons/PrairieIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(4),
      backgroundColor: theme.palette.backgroundGreen.main,
    },
  })
);

const Container: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid container justify="center">
        <PrairieIcon />
      </Grid>
      <Grid container justify="center">
        {children}
      </Grid>
    </Grid>
  );
};

export default Container;
