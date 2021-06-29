import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";

import ResetForm from "./ResetForm";

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

export default function ResetPassword() {
  const classes = useStyles();

  const methods = useForm({
    mode: "onBlur",
  });

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={classes.mb2}>
            <Typography variant="h2" align="center">
              Reset my password
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.mb6}>
            <Typography variant="body1" align="center">
              We&apos;ll send you an email with a link to reset your password
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormProvider {...methods}>
              <ResetForm />
            </FormProvider>
          </Grid>
        </Grid>
      </PlainModal>
    </Container>
  );
}
