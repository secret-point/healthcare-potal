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
      boxShadow: "none !important",
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),

      "&:hover": {
        boxShadow: "none",
        "&.MuiButton-text": {
          background: "transparent",
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

      "&.Mui-focusVisible": {
        boxShadow: "none",
        border: `2px solid ${theme.palette.secondaryMint2.main}`,
      },
    },

    secondaryButton: {
      "&:hover": {
        "&.MuiButton-text .MuiTypography-root": {
          color: theme.palette.primaryNavy.main,
        },
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

    textButton: {
      minWidth: 40,
      padding: theme.spacing(0),

      "& .MuiButton-label": {
        textTransform: "none",
      },

      "&:hover .MuiTypography-root": {
        color: theme.palette.secondaryGreen3.main,
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
  color,
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
        color === "secondary" && classes.secondaryButton,
        className
      )}
      disableRipple
      onClick={onClick}
      color={color}
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
      disableRipple
      className={clsx(classes.button, classes.textButton, className)}
      {...props}
    >
      <Typography
        role="button"
        align="left"
        variant="subtitle1"
        className={classes.buttonText}
      >
        {text}
      </Typography>
    </MuiButton>
  );
};

export default Button;
