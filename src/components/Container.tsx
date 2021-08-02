import clsx from "clsx";
import { useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import useAuth from "../hooks/useAuth";
import PrairieIcon from "../icons/PrairieIcon";
import { Theme } from "../theme/types/createPalette";
import { useViewport } from "../hooks/useViewport";
import ProfileAvatar from "./ProfileAvatar";
import MenuIconButton from "./MenuIconButton";
import LeftSidebar from "./LeftSidebar";

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
      justifyContent: "flex-start",
      gap: theme.spacing(2),
    },
  })
);

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  const { user, fullName } = useAuth();
  const { isMobile } = useViewport();
  const [showMenu, setShowMenu] = useState(false);

  const handleClickMenuButton = () => {
    setShowMenu(true);
  };

  const handleCloseMenuButton = () => {
    setShowMenu(false);
  };

  return (
    <Grid className={clsx(classes.main, className)}>
      {showMenu && (
        <Grid item xs={3}>
          <LeftSidebar userName={fullName} onClose={handleCloseMenuButton} />
        </Grid>
      )}

      <Grid item xs={showMenu ? 9 : 12}>
        <Grid container justify="center" className={classes.topBar}>
          {user && (
            <Box className={classes.avatarWrapper}>
              <MenuIconButton onClick={handleClickMenuButton} />
              <ProfileAvatar user={user} />
            </Box>
          )}
          <PrairieIcon />
        </Grid>

        <Grid
          container
          justify="center"
          className={clsx(
            classes.mainContent,
            isMobile && classes.mobileContent
          )}
        >
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Container;
