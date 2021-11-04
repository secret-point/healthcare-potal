import dayjs from "dayjs";
import { FormEvent, useMemo, useState } from "react";
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

const convertUserToInTakeForm = (user: any) => ({
  ...user,
  dob: dayjs(user.dob).format("YYYY-MM-DD"),
  height: {
    feet: Math.floor(user.height / 12),
    inches: user.height % 12,
  },
  weapon: {
    ...user.weapon,
    hasAccess: user.weapon.hasAccess ? "Yes" : "No",
  },
  dangerToSelf: {
    ...user.dangerToSelf,
    danger: user.dangerToSelf.danger ? "Yes" : "No",
  },
  dangerToOthers: {
    ...user.dangerToOthers,
    danger: user.dangerToOthers.danger ? "Yes" : "No",
  },
  psychHospitalizationHistory: user.psychHospitalizationHistory.map(
    (history: any) => ({
      ...history,
      date: dayjs(history.date).format("YYYY-MM-DD"),
    })
  ),
  medicalDiagnosisHistory: user.medicalDiagnosisHistory.map((history: any) => ({
    ...history,
    date: dayjs(history.date).format("YYYY-MM-DD"),
  })),
  medicalHospitalizationHistory: user.medicalHospitalizationHistory.map(
    (history: any) => ({
      ...history,
      date: dayjs(history.date).format("YYYY-MM-DD"),
    })
  ),
  medicalSurgeryHistory: user.medicalSurgeryHistory.map((history: any) => ({
    ...history,
    date: dayjs(history.date).format("YYYY-MM-DD"),
  })),
});

const convertInTakeFormToUser = (user: any) => ({
  ...user,
  height: user.height.feet * 12 + user.height.inches,
  weapon: {
    ...user.weapon,
    hasAccess: user.weapon.hasAccess === "Yes",
  },
  dangerToSelf: {
    ...user.dangerToSelf,
    danger: user.dangerToSelf.danger === "Yes",
  },
  dangerToOthers: {
    ...user.dangerToOthers,
    danger: user.dangerToOthers.danger === "Yes",
  },
});

const InTakeForm = () => {
  const { user, loadUser } = useAuth();
  const history = useHistory();
  const updateInTakeForm = useUpdateInTakeForm();
  const [currentStep, setCurrentStep] = useState(InTakeFormSteps.START);
  const [form, setForm] = useState<any>({});

  const defaultUserForm = useMemo(() => convertUserToInTakeForm(user), [user]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultUserForm,
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
            <Grid item xs={12} lg={10}>
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
