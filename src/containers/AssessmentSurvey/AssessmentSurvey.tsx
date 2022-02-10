import { FormEvent, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "src/app/types";
import {
  useCheckAssessmentLink,
  useFetchProgressList,
  useCreateNewAssessment,
  useCreateOneTimeNewAssessment,
} from "src/api";
import Container from "src/components/Container";
import { useAuth } from "src/hooks/useAuth";
import { useNotification } from "src/hooks/useNotification";

import {
  AssessmentSurveySteps,
  CHECKIN_QUESTIONS,
  frequencyOptionCodeToValue,
} from "./constants";
import Welcome from "./Welcome";
import ExperienceSurvey from "./ExperienceSurvey";
import CompleteSurvey from "./CompleteSurvey";
import DateOfBirthChecker from "./DateOfBirthChecker";
import DateOfBirthNotMatchDialog from "./DateOfBirthNotMatchDialog";

const AssessmentSurvey = () => {
  const history = useHistory();
  const { assessmentId } = useParams<{ assessmentId?: string }>();

  const { isAuthenticated } = useAuth();
  const { handleError } = useNotification();

  const [surveyStep, setSurveyStep] = useState(AssessmentSurveySteps.WELCOME);
  const [dob, setDOB] = useState<string | null>(null);
  const [isDOBDialogOpen, setIsDOBDialogOpen] = useState(false);

  const { refetch: refetchProgressList } = useFetchProgressList(false);
  const checkAssessmentLink = useCheckAssessmentLink();
  const createNewAssessment = useCreateNewAssessment();
  const createNonAuthNewAssessment = useCreateOneTimeNewAssessment();

  const checkInitialAssessmentLink = useCallback(
    async () => {
      try {
        await checkAssessmentLink({ assessmentId });
      } catch (error) {
        handleError(
          error,
          (error as any)?.response?.data?.message || "Invalid assessment id."
        );
        history.push(ROUTES.DASHBOARD);
      }
    },
    // eslint-disable-next-line
    [assessmentId]
  );

  useEffect(() => {
    checkInitialAssessmentLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInitialAssessmentLink]);

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
        formResult.sideEffects = (question.options || [])
          .filter((option) => form[option.code])
          .map((option) => option.display);
        if (form.MCQ_OTHER_REASON) {
          formResult.sideEffects.push(form.MCQ_OTHER_REASON);
        }
      } else {
        formResult.comment = form.comment;
      }
    });

    return formResult;
  };

  const handleCompleteCheckIn = async (form: any) => {
    const transformedForm = getTransformedForm(form);
    if (isAuthenticated) {
      await createNewAssessment.mutate(transformedForm, {
        onSuccess: () => {
          setSurveyStep(AssessmentSurveySteps.COMPLETE);
        },
        onError: (error) => {
          handleError(
            error,
            "There was an error while processing the assessment"
          );
        },
      });
    } else {
      await createNonAuthNewAssessment.mutate(
        {
          ...transformedForm,
          assessmentId,
          dob,
        },
        {
          onSuccess: () => {
            setSurveyStep(AssessmentSurveySteps.COMPLETE);
          },
          onError: (error) => {
            handleError(
              error,
              "There was an error while processing the assessment"
            );
          },
        }
      );
    }
  };

  const handleSubmitDOB = async (dob: string) => {
    if (!dob && !isAuthenticated) {
      setIsDOBDialogOpen(true);
      return;
    }

    try {
      await checkAssessmentLink({ assessmentId, dob });
      setSurveyStep(AssessmentSurveySteps.QUESTIONS);
      setDOB(dob);
    } catch (error) {
      setIsDOBDialogOpen(true);
    }
  };

  const handleNext = async (e?: FormEvent) => {
    e?.preventDefault();
    switch (surveyStep) {
      case AssessmentSurveySteps.WELCOME:
        if (isAuthenticated) {
          setSurveyStep(AssessmentSurveySteps.QUESTIONS);
        } else {
          setSurveyStep(AssessmentSurveySteps.DOB_CHECKER);
        }
        break;
      case AssessmentSurveySteps.DOB_CHECKER:
        break;
      default:
        if (isAuthenticated) {
          await refetchProgressList();
          history.push(ROUTES.PROGRESS);
        } else {
          history.push(ROUTES.LOGIN);
        }
        break;
    }
  };

  const handleCloseDOBDialog = () => {
    setIsDOBDialogOpen(false);
  };

  return (
    <Container showIcon>
      <FormProvider {...methods}>
        {surveyStep === AssessmentSurveySteps.DOB_CHECKER ? (
          <DateOfBirthChecker onSubmit={handleSubmitDOB} />
        ) : (
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
        )}
      </FormProvider>

      <DateOfBirthNotMatchDialog
        isOpen={isDOBDialogOpen}
        onClose={handleCloseDOBDialog}
      />
    </Container>
  );
};

export default AssessmentSurvey;
