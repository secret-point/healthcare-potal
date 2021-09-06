import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";

import { useRegister } from "../../api";
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
  const history = useHistory();
  const register = useRegister();
  const [currentStep, setCurrentStep] = useState(ONBOARDING.NAME);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleRegister = async () => {
    const values = methods.getValues();
    console.log(register, values);
    // await register(values as any);
    setCurrentStep(ONBOARDING.FINAL);
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    switch (currentStep) {
      case ONBOARDING.NAME:
        setCurrentStep(ONBOARDING.CONTACT);
        break;
      case ONBOARDING.CONTACT:
        setCurrentStep(ONBOARDING.ADDRESS);
        break;
      case ONBOARDING.ADDRESS:
        setCurrentStep(ONBOARDING.PASSWORD);
        break;
      default:
        handleRegister();
        break;
    }
  };

  return (
    <Container>
      <PlainModal>
        {currentStep !== ONBOARDING.FINAL ? (
          <OnboardingProgress currentStep={currentStep} />
        ) : (
          <AllSetup onSignIn={handleLogIn} />
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleNext}>
            {currentStep === ONBOARDING.NAME && <NameInputForm />}
            {currentStep === ONBOARDING.CONTACT && <ContactForm />}
            {currentStep === ONBOARDING.ADDRESS && <AddressForm />}
            {currentStep === ONBOARDING.PASSWORD && <PasswordForm />}
          </form>
        </FormProvider>
      </PlainModal>
    </Container>
  );
}
