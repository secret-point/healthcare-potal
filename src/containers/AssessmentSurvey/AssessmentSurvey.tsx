import { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "../../app/types";
import { useFetchProgressList, useUpdateCheckInForm } from "../../api";
import Container from "../../components/Container";

import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import {
  AssessmentSurveySteps,
  CHECKIN_QUESTIONS,
  frequencyOptionCodeToValue,
} from "./constants";

const AssessmentSurvey = () => {
  const history = useHistory();
  const updateCheckInForm = useUpdateCheckInForm();
  const [surveyStep, setSurveyStep] = useState(AssessmentSurveySteps.WELCOME);
  const { refetch } = useFetchProgressList();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [surveyStep]);

  const methods = useForm({
    mode: "onChange",
  });

  const handleGoToHome = () => {
    history.push(ROUTES.DASHBOARD);
  };

  const getTransformedForm = (form: any): Record<string, any> => {
    const formResult: Record<string, any> = {};

    CHECKIN_QUESTIONS.forEach((question) => {
      if (question.type === "GAD" || question.type === "PHQ") {
        formResult[question.code] = frequencyOptionCodeToValue(
          form[question.code]
        );
      } else if (question.type === "MCQ") {
        formResult.sideEffects = question.options
          ?.filter((option) => form[option.code])
          .map((option) => option.display);
      } else {
        formResult.comment = form.comment;
      }
    });

    return formResult;
  };

  const handleCompleteCheckIn = async (form: any) => {
    await updateCheckInForm.mutate(getTransformedForm(form));
    setSurveyStep(AssessmentSurveySteps.COMPLETE);
  };

  const handleNext = async (e?: FormEvent) => {
    e?.preventDefault();
    switch (surveyStep) {
      case AssessmentSurveySteps.WELCOME:
        setSurveyStep(AssessmentSurveySteps.QUESTIONS);
        break;
      default:
        await refetch();
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
              {surveyStep === AssessmentSurveySteps.WELCOME && (
                <Welcome onCancel={handleGoToHome} />
              )}
              {surveyStep === AssessmentSurveySteps.QUESTIONS && (
                <ExperienceSurvey
                  questions={CHECKIN_QUESTIONS}
                  onNext={handleCompleteCheckIn}
                />
              )}
              {surveyStep === AssessmentSurveySteps.COMPLETE && (
                <CompleteSurvey />
              )}
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

export default AssessmentSurvey;
