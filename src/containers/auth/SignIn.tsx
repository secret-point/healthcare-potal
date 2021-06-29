import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import Link from "../../components/Link";
import PlainModal from "../../components/PlainModal";

import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    mb6: {
      marginBottom: theme.spacing(6),
    },

    mb4: {
      marginBottom: theme.spacing(4),
    },
  })
);

export default function SignIn() {
  const classes = useStyles();

  const methods = useForm({
    mode: "onBlur",
  });

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={classes.mb6}>
            <Typography variant="h1" align="center">
              Sign In
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.mb4}>
            <FormProvider {...methods}>
              <SignInForm />
            </FormProvider>
          </Grid>

          <Grid container item xs={12} justify="center">
            <Link align="center" to="/register" text="Don't have an account?" />
          </Grid>

          <Grid container item xs={12} justify="center">
            <Link
              align="center"
              to="/reset-password"
              text="Don't remember your password?"
            />
          </Grid>
        </Grid>
      </PlainModal>
    </Container>
  );
}
