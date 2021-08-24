import { FC } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../components/Button";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";

interface StartInTakeProps {
  onStart: VoidFunction;
  onCancel: VoidFunction;
}

const StartInTake: FC<StartInTakeProps> = ({ onStart, onCancel }) => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  /* eslint-disable react/jsx-one-expression-per-line */
  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        justify="center"
        className={layoutClasses.mb3}
      >
        <img src="/images/intake.png" height={120} alt="Intake" />
      </Grid>
      <Grid item xs={12} className={layoutClasses.mb2}>
        <Typography
          align="center"
          variant="h1"
          className={fontClasses.fontNormal}
        >
          Let’s start with your intake!
        </Typography>
      </Grid>
      <Grid item xs={12} className={layoutClasses.mb3}>
        <Typography align="center" variant="h6">
          Please fill out this intake form to the best of your knowledge - by
          doing so, you and your doctor can make the most of your appointment
          together. (<b>Completing this form is required </b>in order to meet
          with your doctor.)
        </Typography>
      </Grid>
      <Grid item xs={12} className={layoutClasses.mb8}>
        <Typography align="center" variant="h6">
          Please allow <b>up to 20 minutes</b> to complete this form. You can
          always save your progress and come back later to complete your form.
        </Typography>
      </Grid>
      <Grid item xs={12} className={layoutClasses.mb3}>
        <Button
          text="Start"
          color="primary"
          variant="contained"
          onClick={onStart}
        />
      </Grid>
      <Grid item xs={12}>
        <Button text="Go Back Home" variant="text" onClick={onCancel} />
      </Grid>
    </Grid>
  );
};

export default StartInTake;
