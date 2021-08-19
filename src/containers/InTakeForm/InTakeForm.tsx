import { useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container";
import { InTakeFormSteps } from "./constants";
import CompleteInTakeForm from "./CompleteInTakeForm";
import StartInTake from "./StartInTake";
import SelfInformation from "./SelfInformation";
import { ROUTES } from "../../app/types";

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
        return InTakeFormSteps.SELF_INFORMATION;
      case InTakeFormSteps.SELF_INFORMATION:
        return InTakeFormSteps.ADDITIONAL_INFORMATION;
      case InTakeFormSteps.ADDITIONAL_INFORMATION:
        return InTakeFormSteps.FEELING_INFORMATION;
      case InTakeFormSteps.FEELING_INFORMATION:
        return InTakeFormSteps.MEDICAL_HISTORY;
      case InTakeFormSteps.MEDICAL_HISTORY:
        return InTakeFormSteps.PHARMACY;
      case InTakeFormSteps.PHARMACY:
      default:
        return InTakeFormSteps.COMPLETE;
    }
  };

  const handleGoToNextStep = () => {
    setCurrentStep(getNextStep());
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleReturnHome = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const progress = 10;
  const showProgress = ![
    InTakeFormSteps.START,
    InTakeFormSteps.COMPLETE,
  ].includes(currentStep);
  const title = `${user?.firstName}, let’s get started! Tell us a little bit about yourself.`;

  return (
    <Container>
      <Grid container justify="center">
        <FormProvider {...methods}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {showProgress && (
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

            {currentStep === InTakeFormSteps.START && (
              <StartInTake
                onStart={handleGoToNextStep}
                onCancel={handleCancel}
              />
            )}

            {currentStep === InTakeFormSteps.COMPLETE && (
              <CompleteInTakeForm onReturn={handleReturnHome} />
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
