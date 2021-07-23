import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../components/Button";
import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";

import ResetPasswordForm from "./ResetPasswordForm";
import { useLayoutStyles } from "../../components/useCommonStyles";

export default function ResetPassword() {
  const layoutClasses = useLayoutStyles();
  const history = useHistory();
  const [linkSent, setLinkSent] = useState(false);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleResetPassword = () => {
    setLinkSent(true);
  };

  const handleGoBack = () => {
    history.push("/login");
  };

  return (
    <Container>
      <PlainModal>
        {!linkSent ? (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb2}>
              <Typography variant="h2" align="center">
                Reset my password
              </Typography>
            </Grid>

            <Grid item xs={12} className={layoutClasses.mb6}>
              <Typography variant="body1" align="center">
                We&apos;ll send you an email with a link to reset your password
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormProvider {...methods}>
                <ResetPasswordForm onReset={handleResetPassword} />
              </FormProvider>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12} className={layoutClasses.mb2}>
              <Typography variant="h2" align="center">
                Please check your inbox.
              </Typography>
            </Grid>

            <Grid item xs={12} className={layoutClasses.mb6}>
              <Typography variant="body1" align="center">
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
