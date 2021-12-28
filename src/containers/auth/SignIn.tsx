import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import ErrorText from "../../components/ErrorText";
import Link from "../../components/Link";
import PlainModal from "../../components/PlainModal";
import useAuth from "../../hooks/useAuth";

import SignInForm from "./SignInForm";
import { useLayoutStyles } from "../../components/useCommonStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    errorTextWrapper: {
      marginTop: theme.spacing(1.5),
    },
    title: {
      fontWeight: 500,
    },
  })
);

export default function SignIn() {
  const { logIn } = useAuth();
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const [errorText, setErrorText] = useState<Nullable<string>>(null);

  const methods = useForm({
    mode: "onChange",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await logIn(methods.getValues("email"), methods.getValues("password"));
    } catch (error) {
      setErrorText("Please check your email or password.");
    }
  };

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb4}>
            <Typography variant="h2" align="center" className={classes.title}>
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
            <Link align="center" to="/register" text="Create an account" />
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
