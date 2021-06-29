import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Container from "../../components/Container";
import PlainModal from "../../components/PlainModal";
import { ONBOARDING } from "../../types";

import NameInputForm from "./NameInputForm";
import ContactForm from "./ContactForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";
import OnboardingProgress from "./OnboardingProgress";
import AllSetup from "./AllSetup";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(ONBOARDING.NAME);
  const methods = useForm({
    mode: "onBlur",
  });

  const handleLogIn = () => {};

  return (
    <Container>
      <PlainModal>
        {currentStep !== ONBOARDING.FINAL ? (
          <OnboardingProgress currentStep={currentStep} />
        ) : (
          <AllSetup onSignIn={handleLogIn} />
        )}

        <FormProvider {...methods}>
          {currentStep === ONBOARDING.NAME && (
            <NameInputForm onNext={() => setCurrentStep(ONBOARDING.CONTACT)} />
          )}
          {currentStep === ONBOARDING.CONTACT && (
            <ContactForm onNext={() => setCurrentStep(ONBOARDING.ADDRESS)} />
          )}
          {currentStep === ONBOARDING.ADDRESS && (
            <AddressForm onNext={() => setCurrentStep(ONBOARDING.PASSWORD)} />
          )}
          {currentStep === ONBOARDING.PASSWORD && (
            <PasswordForm onNext={() => setCurrentStep(ONBOARDING.FINAL)} />
          )}
        </FormProvider>
      </PlainModal>
    </Container>
  );
}
