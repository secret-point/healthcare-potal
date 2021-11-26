import { FormEvent, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "../../app/types";
import { useUpdateInTakeForm } from "../../api";
import Container from "../../components/Container";
import useAuth from "../../hooks/useAuth";

import { InTakeFormSteps } from "./constants";
import CompleteInTakeForm from "./CompleteInTakeForm";
import StartInTake from "./StartInTake";
import InTakeFormInput from "./InTakeFormInput";
import { convertUserToInTakeForm, convertInTakeFormToUser } from "./utils";

const InTakeForm = () => {
  const { user, loadUser } = useAuth();
  const history = useHistory();
  const updateInTakeForm = useUpdateInTakeForm();
  const [currentStep, setCurrentStep] = useState(InTakeFormSteps.START);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (user?.status && user.status !== "Pending") {
      history.push(ROUTES.DASHBOARD);
    }
  }, [user, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const defaultInTakeForm = useMemo(
    () => convertUserToInTakeForm(user),
    [user]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultInTakeForm,
  });

  const handleCompleteInTake = async (form: any) => {
    await updateInTakeForm.mutate(convertInTakeFormToUser(form), {
      onSuccess: loadUser,
    });
    setCurrentStep(InTakeFormSteps.COMPLETE);
  };

  const handleGoToNextStep = (e?: FormEvent) => {
    e?.preventDefault();

    switch (currentStep) {
      case InTakeFormSteps.START:
        setCurrentStep(InTakeFormSteps.SELF_INFORMATION);
        break;
      case InTakeFormSteps.COMPLETE:
      default:
        history.push(ROUTES.DASHBOARD);
        break;
    }
  };

  const handleNextForm = () => {
    const newForm = { ...form, ...methods.getValues() };
    setForm(newForm);

    switch (currentStep) {
      case InTakeFormSteps.SELF_INFORMATION:
        setCurrentStep(InTakeFormSteps.ADDITIONAL_INFORMATION);
        break;
      case InTakeFormSteps.ADDITIONAL_INFORMATION:
        setCurrentStep(InTakeFormSteps.FEELING_INFORMATION);
        break;
      case InTakeFormSteps.FEELING_INFORMATION:
        setCurrentStep(InTakeFormSteps.MEDICAL_HISTORY);
        break;
      case InTakeFormSteps.MEDICAL_HISTORY:
      default:
        handleCompleteInTake(newForm);
        break;
    }
  };

  const handleCancel = () => {
    history.goBack();
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
      <FormProvider {...methods}>
        <form onSubmit={handleGoToNextStep}>
          <Grid container justify="center">
            <Grid item xs={12} sm={10} lg={8}>
              {currentStep === InTakeFormSteps.START && (
                <StartInTake onCancel={handleCancel} />
              )}

              {showProgress && (
                <InTakeFormInput
                  currentStep={currentStep}
                  onNext={handleNextForm}
                  onLeave={handleLeaveForm}
                />
              )}

              {currentStep === InTakeFormSteps.COMPLETE && (
                <CompleteInTakeForm />
              )}
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default InTakeForm;
