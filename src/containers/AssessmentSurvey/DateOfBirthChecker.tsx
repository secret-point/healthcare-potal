import { FC, FormEventHandler } from "react";
import { useFormContext } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import Button from "src/components/Button";
import TextInput from "src/components/TextInput";
import { useViewport } from "src/hooks/useViewport";

const useStyles = makeStyles(() =>
  createStyles({
    linearProgress: {
      borderRadius: 2,
    },
  })
);

interface DateOfBirthCheckerProps {
  onSubmit: (dob: string) => void;
}

const DateOfBirthChecker: FC<DateOfBirthCheckerProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const { getValues } = useFormContext();

  const handleNext: FormEventHandler = async (event) => {
    event.preventDefault();
    const dob = await getValues("dob");
    onSubmit(dob);
  };

  return (
    <form onSubmit={handleNext}>
      <Grid container>
        <Grid
          item
          xs={12}
          className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
        >
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={0}
            className={classes.linearProgress}
          />
        </Grid>

        <Grid
          item
          xs={12}
          className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
        >
          <Typography variant="h3" className={fontClasses.fontNormal}>
            To verify your identity, please enter your date of birth.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
        >
          <TextInput
            label="Date of birth"
            fullWidth
            variant="outlined"
            type="date"
            required
            name="dob"
          />
        </Grid>

        <Grid container justify="center">
          <Grid item xs={6}>
            <Button
              text="Next"
              color="primary"
              variant="contained"
              type="submit"
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default DateOfBirthChecker;
