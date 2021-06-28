import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";

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

const CheckInbox = () => {
  const classes = useStyles();

  const handleSignIn = () => {};

  return (
    <Container>
      <PlainModal>
        <Grid container>
          <Grid item xs={12} className={classes.mb2}>
            <Typography variant="h2" align="center">
              Please check your inbox.
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.mb6}>
            <Typography variant="body1" align="center">
              If there is an account associated with the email address you
              provided, you will recieve an email with a password reset link.
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
      </PlainModal>
    </Container>
  );
};

export default CheckInbox;
