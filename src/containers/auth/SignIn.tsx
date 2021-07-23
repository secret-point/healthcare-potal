import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import ErrorText from "../../components/ErrorText";
import Link from "../../components/Link";
import PlainModal from "../../components/PlainModal";
import { Nullable } from "../../types/general";
import useAuth from "../../hooks/useAuth";

import SignInForm from "./SignInForm";
import { useLayoutStyles } from "../../components/useCommonStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    errorTextWrapper: {
      marginTop: theme.spacing(1.5),
    },
  })
);

export default function SignIn() {
  const { logIn } = useAuth();
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const [errorText, setErrorText] = useState<Nullable<string>>(null);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleSubmit = async () => {
    try {
      await logIn(methods.getValues("email"), methods.getValues("password"));
    } catch (error) {
      setErrorText(error.message);
    }
  };

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb6}>
            <Typography variant="h1" align="center">
              Sign In
            </Typography>
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb4}>
            <FormProvider {...methods}>
              <SignInForm onSubmit={handleSubmit} />
            </FormProvider>

            {errorText && (
              <Grid item xs={12} className={classes.errorTextWrapper}>
                <ErrorText errorText={errorText} />
              </Grid>
            )}
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
