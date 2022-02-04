import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "src/components/Container";
import ErrorText from "src/components/ErrorText";
import Link from "src/components/Link";
import PlainModal from "src/components/PlainModalV2";
import { useLayoutStyles } from "src/components/useCommonStyles";
import { useAuth } from "src/hooks/useAuth";
import { ReactComponent as SignInCover } from "src/icons/SignInCover.svg";

import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    errorTextWrapper: {
      marginTop: theme.spacing(1.5),
    },
    subtitle: {
      fontWeight: 400,
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
      <PlainModal CoverIcon={SignInCover}>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb1}>
            <Typography variant="h1">Welcome!</Typography>
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb4}>
            <Typography variant="subtitle1" className={classes.subtitle}>
              Sign in to manage your Prairie Health account.
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

          {/* <Grid container item xs={12} justify="center">
            <Link align="center" to="/register" text="Create an account" />
          </Grid> */}

          <Grid container item xs={12} justify="center">
            <Link
              align="center"
              to="/reset-password"
              text="Forgot your password?"
            />
          </Grid>
        </Grid>
      </PlainModal>
    </Container>
  );
}
