import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
  })
);

const Container: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Grid className={classes.container}>{children}</Grid>;
};

export default Container;
