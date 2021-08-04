import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../components/Button";
import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";
import PasswordForm from "../onboarding/PasswordForm";
import { useLayoutStyles } from "../../components/useCommonStyles";

const ConfirmVerificationLink = () => {
  const layoutClasses = useLayoutStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    enqueueSnackbar("You have successfully verified the link.", {
      variant: "success",
    });
  }, [enqueueSnackbar]);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleChangePassword = () => {
    setPasswordChanged(true);
  };

  const handleSignIn = () => {
    history.push("/login");
  };

  return (
    <Container>
      <PlainModal>
        {!passwordChanged ? (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb6}>
              <Typography variant="h2" align="center">
                Change your password
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormProvider {...methods}>
                <PasswordForm onNext={handleChangePassword} />
              </FormProvider>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb2}>
              <Typography variant="h2" align="center">
                Your password has been updated.
              </Typography>
            </Grid>

            <Grid item xs={12} className={layoutClasses.mb6}>
              <Typography variant="subtitle1" align="center">
                You may now sign to your account using your email and your new
                password.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                text="SIGN IN"
                color="primary"
                variant="contained"
                onClick={handleSignIn}
              />
            </Grid>
          </Grid>
        )}
      </PlainModal>
    </Container>
  );
};

export default ConfirmVerificationLink;
