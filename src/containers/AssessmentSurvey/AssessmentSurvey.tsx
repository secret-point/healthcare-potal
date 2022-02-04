import { FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "src/app/types";
import {
  useCheckAssessmentLink,
  useFetchProgressList,
  useUpdateCheckInForm,
} from "src/api";
import Container from "src/components/Container";

import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import {
  AssessmentSurveySteps,
  CHECKIN_QUESTIONS,
  frequencyOptionCodeToValue,
} from "./constants";
import { useNotification } from "src/hooks/useNotification";

const AssessmentSurvey = () => {
  const history = useHistory();
  const { assessmentId } = useParams<{ assessmentId?: string }>();

  const { handleError } = useNotification();
  const [surveyStep, setSurveyStep] = useState(AssessmentSurveySteps.WELCOME);

  const { refetch } = useFetchProgressList(false);
  const { isError, error } = useCheckAssessmentLink({ assessmentId });
  const updateCheckInForm = useUpdateCheckInForm();

  useEffect(() => {
    if (error) {
      handleError(
        error,
        (error as any)?.response?.data?.message || "Invalid assessment id."
      );
      history.push(ROUTES.DASHBOARD);
    }
  }, [error, history, isError, handleError]);

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
    const formResult: Record<string, any> = {
      markAsRead: false,
    };

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
    <Container showIcon>
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
