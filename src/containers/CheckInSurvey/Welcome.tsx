import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import { useViewport } from "../../hooks/useViewport";

const useStyles = makeStyles(() =>
  createStyles({
    togetherImage: {
      maxWidth: 480,
    },
  })
);

interface WelcomeProps {
  onCancel: VoidFunction;
}

const Welcome: React.FC<WelcomeProps> = ({ onCancel }) => {
  const classes = useStyles();
  const fontClasses = useFontStyles()();
  const layoutClasses = useLayoutStyles()();
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
        <img
          src="/images/together.png"
          width="100%"
          alt="All together."
          className={classes.togetherImage}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          align="center"
          className={clsx(fontClasses.fontNormal, layoutClasses.mb2)}
        >
          Welcome to your
          <b> 2nd check-in!</b>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
      >
        <Typography variant="subtitle1" align="center">
          Completing this survey allows you and your care team to measure your
          progress. Once you complete your check-in, your care team will review
          your response.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          text="Start"
          color="primary"
          type="submit"
          variant="contained"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          color="secondary"
          text="Go Back Home"
          variant="text"
          onClick={onCancel}
        />
      </Grid>
    </Grid>
  );
};

export default Welcome;
