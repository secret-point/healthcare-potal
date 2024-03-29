import clsx from "clsx";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ROUTES } from "src/app/types";
import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";

import Button from "./Button";
import MenuLink from "./MenuLink";
import SubMenu from "./SubMenu";
import { useColorStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 320,
      height: "100vh",
      padding: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
    },
    fullList: {
      width: "100vw",
    },
    iconButton: {
      padding: theme.spacing(0),
    },
    subMenu: {
      "&:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
    logOutButtonWrapper: {
      marginTop: "auto",
    },
    logOutButton: {
      width: 120,
      paddingLeft: 0,
      "& .MuiTypography-root": {
        textTransform: "none",
        letterSpacing: "0px",
        color: theme.palette.accentRed.main,
      },
      "&:hover .MuiTypography-root": {
        color: theme.palette.accentRed2.main,
      },
    },
  })
);

interface LeftSidebarProps {
  open: boolean;
  userName: string;
  onClose: VoidFunction;
  onLogOut: VoidFunction;
}

const LeftSidebar: FC<LeftSidebarProps> = ({
  open,
  userName,
  onClose,
  onLogOut,
}) => {
  const classes = useStyles();
  const { pathname: selectedPath } = useLocation();
  const { isMobile } = useViewport();
  const colorClasses = useColorStyles();

  const subMenus = [
    {
      main: "My Care",
      links: [{ title: "Progress", link: ROUTES.PROGRESS }],
    },
    {
      main: "My Account",
      links: [{ title: "Profile", link: ROUTES.PROFILE }],
    },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div
        role="presentation"
        className={clsx(classes.list, isMobile && classes.fullList)}
        onClick={onClose}
        onKeyDown={onClose}
      >
        <Box
          width={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={6}
        >
          <Typography variant="h3">{["Hi", userName].join(", ")}</Typography>
          <IconButton className={classes.iconButton} onClick={onClose}>
            <CloseIcon className={colorClasses.secondaryGreen1} />
          </IconButton>
        </Box>

        <Box width={1}>
          <Box width={1} mb={5}>
            <MenuLink
              variant="h4"
              title="Home"
              link="/dashboard"
              selected={selectedPath === ROUTES.DASHBOARD}
            />
          </Box>

          {subMenus.map((subMenu) => (
            <SubMenu
              key={subMenu.main}
              main={subMenu.main}
              links={subMenu.links}
              selectedPath={selectedPath}
              className={classes.subMenu}
            />
          ))}
        </Box>

        <Box width={1} className={classes.logOutButtonWrapper}>
          <Button
            text="Sign Out"
            className={classes.logOutButton}
            onClick={onLogOut}
          />
        </Box>
      </div>
    </Drawer>
  );
};

export default LeftSidebar;
