import clsx from "clsx";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import { InTakeFormSteps, IN_TAKE_FORM_STEPS } from "./constants";
import InTakeFormGroupInput from "./InTakeFormGroupInput";

const IN_TAKE_FORM_PROGRESS: Data<number> = {
  [InTakeFormSteps.SELF_INFORMATION]: 10,
  [InTakeFormSteps.ADDITIONAL_INFORMATION]: 30,
  [InTakeFormSteps.FEELING_INFORMATION]: 50,
  [InTakeFormSteps.MEDICAL_HISTORY]: 70,
  [InTakeFormSteps.PHARMACY]: 90,
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
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const [error, setError] = useState<Nullable<string>>(null);
  const { trigger } = useFormContext();

  const form = IN_TAKE_FORM_STEPS[currentStep];
  const progress = IN_TAKE_FORM_PROGRESS[currentStep];
  const title = typeof form.title === "string" ? form.title : form.title(user);

  const handleClickNext = async () => {
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
