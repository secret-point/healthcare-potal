import clsx from "clsx";
import { MouseEvent, FC, useState } from "react";
import { useFormContext } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import { InTakeFormSteps, IN_TAKE_FORM_STEPS } from "./constants";
import InTakeFormGroupInput from "./InTakeFormGroupInput";

const useStyles = makeStyles(() =>
  createStyles({
    linearProgress: {
      borderRadius: 2,
    },
  })
);

const IN_TAKE_FORM_PROGRESS: Data<number> = {
  [InTakeFormSteps.SELF_INFORMATION]: 15,
  [InTakeFormSteps.ADDITIONAL_INFORMATION]: 40,
  [InTakeFormSteps.FEELING_INFORMATION]: 65,
  [InTakeFormSteps.MEDICAL_HISTORY]: 90,
};

interface InTakeFormInputProps {
  currentStep: InTakeFormSteps;
  onNext: VoidFunction;
  onLeave: VoidFunction;
}

const InTakeFormInput: FC<InTakeFormInputProps> = ({
  currentStep,
  onNext,
  onLeave,
}) => {
  const { user } = useAuth();
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const [error, setError] = useState<Nullable<string>>(null);
  const { trigger } = useFormContext();

  const form = IN_TAKE_FORM_STEPS[currentStep];
  const progress = IN_TAKE_FORM_PROGRESS[currentStep];
  const title = typeof form.title === "string" ? form.title : form.title(user);

  const handleClickNext = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await trigger();
    if (result) {
      setError(null);
      onNext();
    } else {
      setError("Please fill out the required fields");
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mb3}>
        <Typography
          variant="h3"
          className={clsx(fontClasses.font500, colorClasses.secondaryGreen1)}
        >
          {title}
        </Typography>
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb6}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progress}
          className={classes.linearProgress}
        />
      </Grid>

      <Grid container spacing={6}>
        {form.groups.map((group) => (
          <Grid key={group.groupName} item xs={12}>
            <InTakeFormGroupInput group={group} />
          </Grid>
        ))}
      </Grid>

      {error && (
        <Grid container className={layoutClasses.mt2}>
          <Typography variant="h4" className={colorClasses.accentRed}>
            {error}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} className={layoutClasses.mt6}>
        <Button
          text="Next"
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleClickNext}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          text="SAVE MY PROGRESS AND LEAVE"
          variant="text"
          onClick={onLeave}
        />
      </Grid>
    </Grid>
  );
};

export default InTakeFormInput;
