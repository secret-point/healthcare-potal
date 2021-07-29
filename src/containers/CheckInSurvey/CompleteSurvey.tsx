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

const useStyles = makeStyles((theme) =>
  createStyles({
    feedbackFormWrapper: {
      position: "fixed",
      left: 0,
      bottom: theme.spacing(4),
    },
  })
);

interface CompleteSurveyProps {
  onNext: VoidFunction;
}

const CompleteSurvey: React.FC<CompleteSurveyProps> = ({ onNext }) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

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
          className={clsx(fontClasses.fontNormal, layoutClasses.mb2)}
        >
          Thank you for completing your check-in!
        </Typography>
      </Grid>
      <Grid item xs={12} className={layoutClasses.mb6}>
        <Typography variant="body1" align="center">
          Your care team will be reviewing your response and reach out to you if
          needed. You can view your progress and your score history by clicking
          on the button below.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          text="View My Progress"
          color="primary"
          variant="contained"
          onClick={onNext}
        />
      </Grid>
      <Grid
        container
        justify="center"
        item
        xs={12}
        className={classes.feedbackFormWrapper}
      >
        <FeedbackForm />
      </Grid>
    </Grid>
  );
};

export default CompleteSurvey;
