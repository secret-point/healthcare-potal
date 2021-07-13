import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import useAuth from "../hooks/useAuth";
import ProfileAvatar from "./ProfileAvatar";
import { Theme } from "../theme/types/createPalette";
import PrairieIcon from "../icons/PrairieIcon";
import { useViewport } from "../hooks/useViewport";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      padding: theme.spacing(3),
      backgroundColor: theme.palette.backgroundGreen.main,
    },

    mainContent: {
      marginTop: theme.spacing(6),
    },

    mobileContent: {
      marginTop: theme.spacing(3),
    },

    topBar: {
      position: "relative",
    },

    avatarWrapper: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
  })
);

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { isMobile } = useViewport();

  return (
    <Grid className={clsx(classes.main, className)}>
      <Grid container justify="center" className={classes.topBar}>
        <PrairieIcon />
        {user && (
          <Box className={classes.avatarWrapper}>
            <ProfileAvatar user={user} />
          </Box>
        )}
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
