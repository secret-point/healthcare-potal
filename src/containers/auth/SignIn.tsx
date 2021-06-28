import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import Link from "../../components/Link";
import PlainModal from "../../components/PlainModal";

import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    formHeader: {
      marginBottom: theme.spacing(6),
    },

    formBody: {
      marginBottom: theme.spacing(4),
    },
  })
);

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={classes.formHeader}>
            <Typography variant="h1" align="center">
              Sign In
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.formBody}>
            <SignInForm />
          </Grid>

          <Grid item xs={12}>
            <Link align="center" to="/register" text="Don't have an account?" />
          </Grid>

          <Grid item xs={12}>
            <Link
              align="center"
              to="/forgot-password"
              text="Don't remember your password?"
            />
          </Grid>
        </Grid>
      </PlainModal>
    </Container>
  );
}
