import { FC } from "react";
import clsx from "clsx";
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Theme } from "../theme/types/createPalette";
import { useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: "100%",
    },

    button: {
      boxShadow: "none",
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),

      "&:hover": {
        boxShadow: "none",
      },

      "&.MuiButton-containedPrimary": {
        "&:hover": {
          backgroundColor: theme.palette.secondaryMint2.main,
        },
      },

      "&.Mui-disabled": {
        backgroundColor: theme.palette.distinctiveGray.main,
      },
    },

    text: {
      letterSpacing: "0.1em",
    },

    noPadding: {
      minWidth: 40,
      padding: theme.spacing(0),
    },

    editButton: {
      padding: theme.spacing(0),
      minWidth: 40,

      "& .MuiButton-label": {
        textTransform: "none",
      },
    },

    buttonText: {
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface ButtonProps extends MuiButtonProps {
  text: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  className?: string;
  textClassName?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  fullWidth = true,
  noPadding = false,
  className,
  textClassName,
  onClick,
  ...props
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <MuiButton
      className={clsx(
        classes.button,
        fullWidth && classes.fullWidth,
        noPadding && layoutClasses.noPadding,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <Typography variant="h5" className={clsx(classes.text, textClassName)}>
        {text}
      </Typography>
    </MuiButton>
  );
};

export const EditButton: FC<MuiButtonProps> = ({
  onClick,
  title = "Edit",
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      variant="text"
      onClick={onClick}
      className={clsx(classes.button, classes.editButton)}
      {...props}
    >
      <Typography variant="body1" role="button" className={classes.buttonText}>
        {title}
      </Typography>
    </MuiButton>
  );
};

export default Button;
