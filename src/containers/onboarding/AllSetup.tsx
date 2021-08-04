import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";
import Button from "../../components/Button";
import { useLayoutStyles } from "../../components/useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mb2: {
      marginBottom: theme.spacing(2),
    },
    mb6: {
      marginBottom: theme.spacing(6),
    },
    mb3: {
      marginBottom: theme.spacing(3),
    },
    typography: {
      color: theme.palette.primaryNavy.main,
    },
  })
);

interface AllSetupProps {
  onSignIn: () => void;
}

const AllSetup: React.FC<AllSetupProps> = ({ onSignIn }) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h2" className={layoutClasses.mb2}>
          Great! You&apos;re all set up.
        </Typography>
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb6}>
        <Typography
          align="center"
          variant="subtitle1"
          className={classes.typography}
        >
          You can now sign in to your account using your email and password.
        </Typography>
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb3}>
        <img src="/images/together.png" width="100%" alt="We are done." />
      </Grid>

      <Grid item xs={12}>
        <Button
          text="SIGN IN"
          color="primary"
          variant="contained"
          onClick={onSignIn}
        />
      </Grid>
    </Grid>
  );
};

export default AllSetup;
