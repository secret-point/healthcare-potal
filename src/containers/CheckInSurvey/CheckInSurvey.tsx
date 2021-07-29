import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import Container from "../../components/Container";

import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import { CheckInSurveySteps, QUESTIONS } from "./constants";

const CheckInSurvey = () => {
  const history = useHistory();
  const [surveyStep, setSurveyStep] = useState(CheckInSurveySteps.WELCOME);

  const methods = useForm({
    mode: "onBlur",
  });

  const getNextStep = () => {
    switch (surveyStep) {
      case CheckInSurveySteps.WELCOME:
        return CheckInSurveySteps.QUESTIONS;
      case CheckInSurveySteps.QUESTIONS:
      default:
        return CheckInSurveySteps.COMPLETE;
    }
  };

  const handleGoToNextStep = () => {
    setSurveyStep(getNextStep());
  };

  const handleGoToHome = () => {
    history.push("/dashboard");
  };

  return (
    <Container>
      <Grid container justify="center">
        <FormProvider {...methods}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            {surveyStep === CheckInSurveySteps.WELCOME && (
              <Welcome onNext={handleGoToNextStep} onCancel={handleGoToHome} />
            )}
            {surveyStep === CheckInSurveySteps.QUESTIONS && (
              <ExperienceSurvey
                questions={QUESTIONS}
                onNext={handleGoToNextStep}
              />
            )}
            {surveyStep === CheckInSurveySteps.COMPLETE && (
              <CompleteSurvey onNext={handleGoToNextStep} />
            )}
          </Grid>
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default CheckInSurvey;
