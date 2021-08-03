import clsx from "clsx";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useViewport } from "../hooks/useViewport";
import { Theme } from "../theme/types/createPalette";

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
      "& .MuiTypography-root": {
        textTransform: "none",
        color: theme.palette.accentRed.main,
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
  const { isMobile } = useViewport();
  const colorClasses = useColorStyles();

  const subMenus = [
    {
      main: "My Care",
      links: [
        { title: "Progress", link: "/progress" },
        { title: "Appointments", link: "/appointments" },
        { title: "Prescriptions", link: "/prescriptions" },
      ],
    },
    {
      main: "My Account",
      links: [
        { title: "Profile", link: "/profile" },
        { title: "Billing", link: "/billing" },
        { title: "Documents", link: "/documents" },
      ],
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
            <MenuLink variant="h4" title="Home" link="/dashboard" />
          </Box>

          {subMenus.map((subMenu) => (
            <SubMenu
              key={subMenu.main}
              main={subMenu.main}
              links={subMenu.links}
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
