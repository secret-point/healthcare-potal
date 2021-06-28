import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: "100%",
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
      color: theme.palette.primaryNavy.main,
    },
  })
);

interface ButtonProps extends MuiButtonProps {
  text: string;
}

const Button = ({ text, onClick, ...props }: ButtonProps) => {
  const classes = useStyles();

  return (
    <MuiButton className={classes.button} onClick={onClick} {...props}>
      <Typography variant="h5" className={classes.text}>
        {text}
      </Typography>
    </MuiButton>
  );
};

export default Button;
