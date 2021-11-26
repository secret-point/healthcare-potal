import { useSnackbar } from "notistack";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { User } from "../../types";
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
  const history = useHistory();
  const { user, loadUser } = useAuth();
  const updateInTakeForm = useUpdateInTakeForm();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({});
  const [currentStep, setCurrentStep] = useState(InTakeFormSteps.START);

  // We will only allow the users to stay on InTakeForm if the status is not pending
  useEffect(() => {
    if (user?.status && user.status !== "Pending") {
      history.push(ROUTES.DASHBOARD);
    }
  }, [user, history]);

  // Scrolls to the top of the page when the step is changed.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const getInTakeFormStorageKey = (user: User) =>
    `${user._id || ""}-saved-intake-form`;

  const previousInTakeForm = useMemo(() => {
    if (!user) return;

    const previousInTakeFormKey = getInTakeFormStorageKey(user);
    const savedInTakeForm =
      JSON.parse(localStorage.getItem(previousInTakeFormKey) || "{}") || {};
    return savedInTakeForm;
  }, [user]);

  const defaultInTakeForm = useMemo(
    () => previousInTakeForm.values || convertUserToInTakeForm(user),
    [user, previousInTakeForm]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultInTakeForm,
  });

  // Restores the previous intake session
  const restorePreviousInTakeSession = useCallback(() => {
    if (previousInTakeForm.step) {
      setCurrentStep(previousInTakeForm.step);
      enqueueSnackbar("Previous intake session has been restored.", {
        variant: "success",
      });
    }
  }, [previousInTakeForm, enqueueSnackbar]);

  useEffect(() => {
    restorePreviousInTakeSession();
  }, [restorePreviousInTakeSession]);

  const isInProgress = ![
    InTakeFormSteps.START,
    InTakeFormSteps.COMPLETE,
  ].includes(currentStep);

  const handleLeaveForm = () => {
    if (!user || !isInProgress) return;

    const currentInTakeForm = { ...form, ...methods.getValues() };
    const localStoragePayload = {
      step: currentStep,
      values: currentInTakeForm,
    };
    localStorage.setItem(
      getInTakeFormStorageKey(user),
      JSON.stringify(localStoragePayload)
    );
    history.push(ROUTES.DASHBOARD);
  };

  useEffect(
    () => handleLeaveForm,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isInProgress]
  );

  if (!user) {
    return null;
  }

  const handleCancel = () => {
    history.goBack();
  };

  const handleCompleteInTake = async (form: any) => {
    await updateInTakeForm.mutate(convertInTakeFormToUser(form), {
      onSuccess: loadUser,
    });
    setCurrentStep(InTakeFormSteps.COMPLETE);
    localStorage.removeItem(getInTakeFormStorageKey(user));
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

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={handleGoToNextStep}>
          <Grid container justify="center">
            <Grid item xs={12} sm={10} lg={8}>
              {currentStep === InTakeFormSteps.START && (
                <StartInTake onCancel={handleCancel} />
              )}

              {isInProgress && (
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
