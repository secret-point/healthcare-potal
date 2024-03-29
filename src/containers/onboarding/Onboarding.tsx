import { useSnackbar } from "notistack";
import { FormEvent, useState } from "react";
import { useHistory } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useRegister } from "src/api";
import Container from "src/components/Container";
import PlainModal from "src/components/PlainModalV1";
import { ONBOARDING } from "src/types";

import NameForm from "./NameForm";
import ContactForm from "./ContactForm";
import AddressForm from "./AddressForm";
import PasswordForm from "./PasswordForm";
import OnboardingProgress from "./OnboardingProgress";
import AllSetup from "./AllSetup";

export default function Onboarding() {
  const history = useHistory();
  const register = useRegister();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(ONBOARDING.NAME);

  const methods = useForm({
    mode: "onChange",
  });

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleRegister = async (form: any) => {
    setLoading(true);
    try {
      await register(form);
      setCurrentStep(ONBOARDING.FINAL);
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || error.message, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const address = {
    address1: form.addressLine1,
    address2: form.addressLine2,
    city: form.city,
    state: form.state,
    zip: form.zipcode,
  };

  const convertToRegisterForm = (form: any) => ({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
    password: form.password,
    billingAddress: address,
    shippingAddress: address,
  });

  const handleNext = (e: FormEvent) => {
    e.preventDefault();

    const newForm = { ...form, ...methods.getValues() };
    setForm(newForm);

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
        handleRegister(convertToRegisterForm(newForm));
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

        {loading && <LinearProgress />}
        <FormProvider {...methods}>
          <form onSubmit={handleNext}>
            {currentStep === ONBOARDING.NAME && <NameForm />}
            {currentStep === ONBOARDING.CONTACT && <ContactForm />}
            {currentStep === ONBOARDING.ADDRESS && <AddressForm />}
            {currentStep === ONBOARDING.PASSWORD && <PasswordForm />}
          </form>
        </FormProvider>
      </PlainModal>
    </Container>
  );
}
