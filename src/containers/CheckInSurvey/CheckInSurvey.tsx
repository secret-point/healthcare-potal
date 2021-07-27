import { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../../components/Container";
import Welcome from "./Welcome";
import { CheckInSurveySteps } from "./constants";

const CheckInSurvey = () => {
  const history = useHistory();
  const [surveyStep, setSurveyStep] = useState(CheckInSurveySteps.WELCOME);

  const handleWelcomeNext = () => {
    setSurveyStep(CheckInSurveySteps.PHQ);
  };

  const handleGoToHome = () => {
    history.push("/dashboard");
  };

  return (
    <Container>
      {surveyStep === CheckInSurveySteps.WELCOME && (
        <Welcome onNext={handleWelcomeNext} onCancel={handleGoToHome} />
      )}
    </Container>
  );
};

export default CheckInSurvey;
