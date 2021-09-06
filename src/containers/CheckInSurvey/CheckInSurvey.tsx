import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "../../app/types";
import { useUpdateCheckIn } from "../../api";
import Container from "../../components/Container";

import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import { CheckInSurveySteps, QUESTIONS } from "./constants";

const CheckInSurvey = () => {
  const history = useHistory();
  const updateCheckIn = useUpdateCheckIn();
  const [surveyStep, setSurveyStep] = useState(CheckInSurveySteps.WELCOME);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleGoToHome = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const handleCompleteCheckIn = async () => {
    const values = methods.getValues();
    await updateCheckIn.mutate(values);
    history.push(ROUTES.PROGRESS);
  };

  const handleNext = (e?: FormEvent) => {
    e?.preventDefault();
    switch (surveyStep) {
      case CheckInSurveySteps.WELCOME:
        setSurveyStep(CheckInSurveySteps.QUESTIONS);
        break;
      case CheckInSurveySteps.QUESTIONS:
        setSurveyStep(CheckInSurveySteps.COMPLETE);
        break;
      default:
        handleCompleteCheckIn();
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
                <ExperienceSurvey questions={QUESTIONS} onNext={handleNext} />
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
