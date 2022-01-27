import { FormEvent, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useSendResetPasswordLink } from "../../api";
import Button from "../../components/Button";
import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";
import { useLayoutStyles } from "../../components/useCommonStyles";
import { ResetPasswordLinkForm } from "../../types";

import ResetPasswordForm from "./ResetPasswordForm";
import { ROUTES } from "../../app/types";
import useNotification from "../../hooks/useNotification";
import { ReactComponent as ResetPasswordCover } from "../../icons/ResetPasswordCover.svg";

const useStyles = makeStyles(() =>
  createStyles({
    subtitle: {
      fontWeight: 400,
    },
  })
);

export default function ResetPassword() {
  const history = useHistory();
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const [linkSent, setLinkSent] = useState(false);
  const { handleSuccess, handleError } = useNotification();

  const sendResetPasswordLink = useSendResetPasswordLink();

  const methods = useForm({
    mode: "onChange",
  });

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const resetPasswordForm = methods.getValues() as ResetPasswordLinkForm;
    try {
      await sendResetPasswordLink({
        ...resetPasswordForm,
        verificationUrl: window.location.origin + ROUTES.VERIFICATION_LINK,
      });
      setLinkSent(true);

      handleSuccess(
        "You will receive an email to reset your password if there exists an account associated with the email address you provided."
      );
    } catch (error) {
      handleError(error, error.data?.message || error.message);
    }
  };

  const handleGoBack = () => {
    history.push("/login");
  };

  return (
    <Container>
      <PlainModal CoverIcon={ResetPasswordCover}>
        {!linkSent ? (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb1}>
              <Typography variant="h1">Reset my password</Typography>
            </Grid>

            <Grid item xs={12} className={layoutClasses.mb4}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Well send you an email with a link to reset your password
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormProvider {...methods}>
                <form onSubmit={handleResetPassword}>
                  <ResetPasswordForm />
                </form>
              </FormProvider>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb1}>
              <Typography variant="h1">Please check your inbox.</Typography>
            </Grid>

            <Grid item xs={12} className={layoutClasses.mb4}>
              <Typography variant="subtitle1">
                If there is an account associated with the email address you
                provided, you will recieve an email with a password reset link.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Button
                text="GO BACK"
                color="primary"
                variant="contained"
                onClick={handleGoBack}
              />
            </Grid>
          </Grid>
        )}
      </PlainModal>
    </Container>
  );
}
