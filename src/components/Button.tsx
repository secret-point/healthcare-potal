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
        "&.MuiButton-text": {
          background: "transparent",
          "& .MuiTypography-root": {
            color: theme.palette.primaryNavy.main,
          },
        },
      },

      "&.MuiButton-containedPrimary": {
        "&:hover": {
          backgroundColor: theme.palette.secondaryMint2.main,
        },
      },

      "&.Mui-disabled": {
        backgroundColor: theme.palette.distinctiveGray.main,
      },

      "&.MuiButton-text .MuiTypography-root": {
        color: theme.palette.secondaryNavy2.main,
      },
    },

    text: {
      letterSpacing: "0.1em",
    },

    noPadding: {
      minWidth: 40,
      padding: theme.spacing(0),
    },

    TextButton: {
      minWidth: 40,
      padding: theme.spacing(0),

      "& .MuiButton-label": {
        textTransform: "none",
      },
    },

    buttonText: {
      fontWeight: 700,
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface ButtonProps extends MuiButtonProps {
  text: React.ReactNode;
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
  const layoutClasses = useLayoutStyles()();

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

interface TextButtonProps extends MuiButtonProps {
  text?: React.ReactNode;
}

export const TextButton: FC<TextButtonProps> = ({
  onClick,
  text = "Edit",
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      variant="text"
      onClick={onClick}
      className={clsx(classes.button, classes.TextButton, className)}
      {...props}
    >
      <Typography
        role="button"
        align="center"
        variant="subtitle1"
        className={classes.buttonText}
      >
        {text}
      </Typography>
    </MuiButton>
  );
};

export default Button;
