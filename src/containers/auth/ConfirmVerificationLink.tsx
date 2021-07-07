import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";
import PasswordForm from "../onboarding/PasswordForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    mb2: {
      marginBottom: theme.spacing(2),
    },
    mb6: {
      marginBottom: theme.spacing(6),
    },
  })
);

const ConfirmVerificationLink = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar("You have successfully verified the link.", {
      variant: "success",
    });
  }, [enqueueSnackbar]);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleChangePassword = () => {};

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={classes.mb6}>
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
      </PlainModal>
    </Container>
  );
};

export default ConfirmVerificationLink;
