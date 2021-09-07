import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import FeedbackForm from "../../components/FeedbackForm";
import { useViewport } from "../../hooks/useViewport";

const useStyles = makeStyles((theme) =>
  createStyles({
    feedbackFormWrapper: {
      position: "fixed",
      left: 0,
      bottom: theme.spacing(4),
    },
  })
);

const CompleteInTakeForm = () => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const { isMobile } = useViewport();

  return (
    <Grid container>
      <Grid
        container
        justify="center"
        item
        xs={12}
        className={layoutClasses.mb3}
      >
        <img src="/images/celebration.png" height={120} alt="Celebration" />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          align="center"
          className={clsx(fontClasses.font500, layoutClasses.mb2)}
        >
          Thank you for completing the intake form!
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
      >
        <Typography variant="subtitle1" align="center">
          We’ll review your intake form before your first visit. Your Care
          Coordinator might reach out to you if additional information is
          necessary.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          text="RETURN HOME"
          color="primary"
          variant="contained"
          type="submit"
        />
      </Grid>
      <Grid
        container
        justify="center"
        item
        xs={12}
        className={classes.feedbackFormWrapper}
      >
        <FeedbackForm
          locale={{ yourExperience: "How was your experience with this form?" }}
        />
      </Grid>
    </Grid>
  );
};

export default CompleteInTakeForm;
