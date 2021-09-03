import { useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "../../app/types";
import Container from "../../components/Container";
import { InTakeFormSteps } from "./constants";
import CompleteInTakeForm from "./CompleteInTakeForm";
import StartInTake from "./StartInTake";
import InTakeFormInput from "./InTakeFormInput";

const InTakeForm = () => {
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

  const handleLeaveForm = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const showProgress = ![
    InTakeFormSteps.START,
    InTakeFormSteps.COMPLETE,
  ].includes(currentStep);

  return (
    <Container>
      <Grid container justify="center">
        <FormProvider {...methods}>
          <Grid item xs={12} lg={10}>
            {currentStep === InTakeFormSteps.START && (
              <StartInTake
                onStart={handleGoToNextStep}
                onCancel={handleCancel}
              />
            )}

            {showProgress && (
              <InTakeFormInput
                currentStep={currentStep}
                onNext={handleGoToNextStep}
                onLeave={handleLeaveForm}
              />
            )}

            {currentStep === InTakeFormSteps.COMPLETE && (
              <CompleteInTakeForm onReturn={handleReturnHome} />
            )}
          </Grid>
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default InTakeForm;
