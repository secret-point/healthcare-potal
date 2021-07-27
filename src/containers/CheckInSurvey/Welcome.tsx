import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../components/Button";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";

interface WelcomeProps {
  onCancel: VoidFunction;
  onNext: VoidFunction;
}

const Welcome: React.FC<WelcomeProps> = ({ onCancel, onNext }) => {
  const layoutClasses = useLayoutStyles();
  const fontClasses = useFontStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Grid
          container
          justify="center"
          item
          xs={12}
          className={layoutClasses.mb3}
        >
          <img src="/images/together.png" width={480} alt="All together." />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            align="center"
            className={clsx(fontClasses.normalFontWeight, layoutClasses.mb2)}
          >
            Welcome to your
            <b> 2nd check-in!</b>
          </Typography>
        </Grid>
        <Grid item xs={12} className={layoutClasses.mb6}>
          <Typography variant="body1" align="center">
            Completing this survey allows you and your care team to measure your
            progress. Once you complete your check-in, your care team will
            review your response.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            text="Start"
            color="primary"
            variant="contained"
            onClick={onNext}
          />
        </Grid>
        <Grid item xs={12}>
          <Button text="Go Back Home" variant="text" onClick={onCancel} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Welcome;
