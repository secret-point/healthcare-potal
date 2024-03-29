import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorText: {
      color: theme.palette.accentRed.main,
    },
  })
);

interface ErrorTextProps {
  errorText: string;
}

export default function ErrorText({ errorText }: ErrorTextProps) {
  const classes = useStyles();

  return (
    <Typography variant="subtitle1" className={classes.errorText}>
      {errorText}
    </Typography>
  );
}
