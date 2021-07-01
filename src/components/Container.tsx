import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import PrairieIcon from "../icons/PrairieIcon";
import { useViewport } from "../hooks/useViewport";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(4),
      backgroundColor: theme.palette.backgroundGreen.main,
    },

    mainContent: {
      marginTop: theme.spacing(10),
    },

    mobileContent: {
      marginTop: theme.spacing(4),
    },
  })
);

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();

  return (
    <Grid className={clsx(classes.main, className)}>
      <Grid container justify="center">
        <PrairieIcon />
      </Grid>
      <Grid
        container
        justify="center"
        className={clsx(classes.mainContent, isMobile && classes.mobileContent)}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default Container;
