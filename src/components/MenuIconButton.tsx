import clsx from "clsx";
import { FC } from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useBackgroundColorStyles, useLayoutStyles } from "./useCommonStyles";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useViewport } from "../hooks/useViewport";

const SvgIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1.5" cy="1.5" r="1.5" fill="#183F4F" />
    <circle cx="7.5" cy="1.5" r="1.5" fill="#183F4F" />
    <circle cx="13.5" cy="1.5" r="1.5" fill="#183F4F" />
    <circle cx="1.5" cy="1.5" r="1.5" fill="#183F4F" />
    <circle cx="1.5" cy="7.5" r="1.5" fill="#183F4F" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="#183F4F" />
    <circle cx="13.5" cy="7.5" r="1.5" fill="#183F4F" />
    <circle cx="1.5" cy="7.5" r="1.5" fill="#183F4F" />
    <circle cx="1.5" cy="13.5" r="1.5" fill="#183F4F" />
    <circle cx="7.5" cy="13.5" r="1.5" fill="#183F4F" />
    <circle cx="13.5" cy="13.5" r="1.5" fill="#183F4F" />
    <circle cx="1.5" cy="13.5" r="1.5" fill="#183F4F" />
  </svg>
);

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      minWidth: 32,
      padding: theme.spacing(1, 1.5),
      borderRadius: theme.spacing(2.5),
      textTransform: "none",
    },
  })
);

interface MenuIconButtonProps extends ButtonProps {}

const MenuIconButton: FC<MenuIconButtonProps> = ({ onClick }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();
  const layoutClasses = useLayoutStyles()();
  const backgroundClasses = useBackgroundColorStyles()();

  return (
    <Button
      onClick={onClick}
      className={clsx(classes.button, backgroundClasses.backgroundMint)}
    >
      <SvgIcon />
      {!isMobile && (
        <Typography variant="h6" className={layoutClasses.ml1}>
          Menu
        </Typography>
      )}
    </Button>
  );
};

export default MenuIconButton;
