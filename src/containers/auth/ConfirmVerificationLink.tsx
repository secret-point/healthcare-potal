import { FormEvent, useCallback, useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useChangePasswordCode, useVerifyResetPasswordCode } from "src/api";
import { useQueryParams } from "src/api/useQueryParams";
import { ChangePasswordCodeForm } from "src/types";
import { ROUTES } from "src/app/types";
import Button from "src/components/Button";
import Container from "src/components/Container";
import PlainModal from "src/components/PlainModalV1";
import { useLayoutStyles } from "src/components/useCommonStyles";

import PasswordForm from "./PasswordForm";

const ConfirmVerificationLink = () => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const layoutClasses = useLayoutStyles();
  const { enqueueSnackbar } = useSnackbar();
  const changePasswordCode = useChangePasswordCode();
  const verifyResetPasswordCode = useVerifyResetPasswordCode();
  const [passwordChanged, setPasswordChanged] = useState(false);

  const code = queryParams.get("code") || "";
  const email = queryParams.get("email") || "";

  const handleVerifyLink = useCallback(async () => {
    try {
      await verifyResetPasswordCode({ code, email });
      enqueueSnackbar("You have successfully verified the link.", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("The verification link is not valid.", {
        variant: "error",
      });
      history.push(ROUTES.RESET_PASSWORD);
    }
    // eslint-disable-next-line
  }, [code, email]);

  useEffect(() => {
    handleVerifyLink();
  }, [handleVerifyLink]);

  const methods = useForm({
    mode: "onChange",
  });

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();

    const values = methods.getValues();
    changePasswordCode({ ...values, email, code } as ChangePasswordCodeForm);

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
            <Grid item xs={12} className={layoutClasses.mb4}>
              <Typography variant="h2" align="center">
                Change your password
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormProvider {...methods}>
                <form onSubmit={handleChangePassword}>
                  <PasswordForm />
                </form>
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

            <Grid item xs={12} className={layoutClasses.mb4}>
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
