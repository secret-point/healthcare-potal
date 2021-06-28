import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import PrairieIcon from "../icons/PrairieIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(4),
      backgroundColor: theme.palette.backgroundGreen.main,
    },

    mainContent: {
      marginTop: theme.spacing(10),
    },
  })
);

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  return (
    <Grid className={clsx(classes.main, className)}>
      <Grid container justify="center">
        <PrairieIcon />
      </Grid>
      <Grid container justify="center" className={classes.mainContent}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Container;
