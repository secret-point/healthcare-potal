import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepConnector from "@material-ui/core/StepConnector";
import StepLabel from "@material-ui/core/StepLabel";
import { StepIconProps } from "@material-ui/core/StepIcon";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { ONBOARDING } from "../../types";
import { Theme } from "../../theme/types/createPalette";

const OnobardingStepConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundColor: "#6D9147",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#6D9147",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#E3E3E3",
    borderRadius: 1,
  },
})(StepConnector);

const useStepIconStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
    },
    active: {
      color: theme.palette.secondaryGreen2.main,
    },
    circle: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    completed: {
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

const StepIcon = ({ active, completed }: StepIconProps) => {
  const classes = useStepIconStyles();

  return (
    <div className={classes.root}>
      <div
        className={clsx(
          classes.circle,
          active && classes.active,
          completed && classes.completed
        )}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(6),
    },
    stepper: {
      background: "transparent",
    },
    stepLabel: {
      "& .MuiStepLabel-iconContainer": {
        paddingRight: 0,
      },
    },
  })
);
interface OnboardingProgressProps {
  currentStep: ONBOARDING;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
}) => {
  const classes = useStyles();
  const onboardingSteps = [
    ONBOARDING.NAME,
    ONBOARDING.CONTACT,
    ONBOARDING.ADDRESS,
    ONBOARDING.PASSWORD,
  ];
  const activeStep = onboardingSteps.findIndex((step) => step === currentStep);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <Stepper
          activeStep={activeStep}
          connector={<OnobardingStepConnector />}
          className={classes.stepper}
        >
          {onboardingSteps.map((label) => (
            <Step key={label}>
              <StepLabel
                className={classes.stepLabel}
                StepIconComponent={StepIcon}
              />
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12}>
        <Typography align="center" variant="h2">
          {currentStep}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OnboardingProgress;
