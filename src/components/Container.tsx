import clsx from "clsx";
import { useState } from "react";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import useAuth from "../hooks/useAuth";
import { ReactComponent as PrairieIcon } from "../icons/PrairieIcon.svg";
import { Theme } from "../theme/types/createPalette";
import { useViewport } from "../hooks/useViewport";
import { ROUTES } from "../app/types";
import ProfileAvatar from "./ProfileAvatar";
import MenuIconButton from "./MenuIconButton";
import LeftSidebar from "./LeftSidebar";
import { useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      position: "relative",
      padding: theme.spacing(3),
      backgroundColor: theme.palette.backgroundGreen.main,
    },

    contentWrapper: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      padding: theme.spacing(0, 4),
    },

    mobileSideContentWrapper: {
      display: "none",
    },

    mainContent: {
      marginTop: theme.spacing(6),
    },

    mobileContent: {
      marginTop: theme.spacing(3),
    },

    topBarWrapper: {
      position: "relative",
    },

    menuTriggerWrapper: {
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

    iconButton: {
      "&:hover": {
        background: "transparent",
      },
    },
  })
);

interface ContainerProps {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  const history = useHistory();
  const { isMobile } = useViewport();
  const layoutClasses = useLayoutStyles();
  const { user, fullName, logOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleClickMenuButton = () => {
    setShowMenu(true);
  };

  const handleCloseMenuButton = () => {
    setShowMenu(false);
  };

  const handleLogOut = () => {
    logOut();
    history.push("/login");
  };

  const handleGoHome = () => {
    history.push(ROUTES.DASHBOARD);
  };

  return (
    <Grid container className={clsx(classes.main, className)}>
      <LeftSidebar
        open={showMenu}
        userName={fullName}
        onLogOut={handleLogOut}
        onClose={handleCloseMenuButton}
      />

      {user && (
        <Grid container justify="center" className={classes.topBarWrapper}>
          <Box className={classes.menuTriggerWrapper}>
            <MenuIconButton onClick={handleClickMenuButton} />
            {!isMobile && (
              <ProfileAvatar
                firstName={user.firstName}
                lastName={user.lastName}
                picture={user.profilePicture}
                isClickable
              />
            )}
          </Box>
          <IconButton
            disableTouchRipple
            className={clsx(classes.iconButton, layoutClasses.noPadding)}
            onClick={handleGoHome}
          >
            <PrairieIcon />
          </IconButton>
        </Grid>
      )}

      <Box
        className={clsx(
          classes.contentWrapper,
          showMenu && isMobile && classes.mobileSideContentWrapper
        )}
      >
        <Grid
          container
          item
          xs={12}
          justify="center"
          className={clsx(
            classes.mainContent,
            isMobile && classes.mobileContent
          )}
        >
          {children}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Container;
