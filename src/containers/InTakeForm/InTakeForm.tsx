import { useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container";
import { InTakeFormSteps } from "./constants";
import StartInTake from "./StartInTake";
import SelfInformation from "./SelfInformation";

const InTakeForm = () => {
  const { user } = useAuth();
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(InTakeFormSteps.START);

  const methods = useForm({
    mode: "onBlur",
  });

  const getNextStep = () => {
    switch (currentStep) {
      case InTakeFormSteps.START:
      default:
        return InTakeFormSteps.SELF_INFORMATION;
    }
  };

  const handleGoToNextStep = () => {
    setCurrentStep(getNextStep());
  };

  const handleCancel = () => {
    history.goBack();
  };

  const progress = 10;

  const title = `${user?.firstName}, let’s get started! Tell us a little bit about yourself.`;

  return (
    <Container>
      <Grid container justify="center">
        <FormProvider {...methods}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {currentStep === InTakeFormSteps.START ? (
              <StartInTake
                onStart={handleGoToNextStep}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography>{title}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={progress}
                  />
                </Grid>
              </>
            )}

            {currentStep === InTakeFormSteps.SELF_INFORMATION && (
              <SelfInformation />
            )}
          </Grid>
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default InTakeForm;
