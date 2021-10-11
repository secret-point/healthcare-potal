import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "../../app/types";
import { useUpdateCheckInForm } from "../../api";
import Container from "../../components/Container";

import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import { CheckInSurveySteps, QUESTIONS } from "./constants";

const CheckInSurvey = () => {
  const history = useHistory();
  const updateCheckInForm = useUpdateCheckInForm();
  const [surveyStep, setSurveyStep] = useState(CheckInSurveySteps.WELCOME);

  const methods = useForm({
    mode: "onChange",
  });

  const handleGoToHome = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const handleCompleteCheckIn = async (form: any) => {
    await updateCheckInForm.mutate(form);
    setSurveyStep(CheckInSurveySteps.COMPLETE);
  };

  const handleNext = (e?: FormEvent) => {
    e?.preventDefault();
    switch (surveyStep) {
      case CheckInSurveySteps.WELCOME:
        setSurveyStep(CheckInSurveySteps.QUESTIONS);
        break;
      default:
        history.push(ROUTES.PROGRESS);
        break;
    }
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={handleNext}>
          <Grid container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {surveyStep === CheckInSurveySteps.WELCOME && (
                <Welcome onCancel={handleGoToHome} />
              )}
              {surveyStep === CheckInSurveySteps.QUESTIONS && (
                <ExperienceSurvey
                  questions={QUESTIONS}
                  onNext={handleCompleteCheckIn}
                />
              )}
              {surveyStep === CheckInSurveySteps.COMPLETE && <CompleteSurvey />}
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default CheckInSurvey;
