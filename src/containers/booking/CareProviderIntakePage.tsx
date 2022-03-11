import { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {
  useRegister,
  useGetCareProvider,
  useCareMemberAvailableTimesByEmail,
  useBookAppointment,
} from "src/api";
import { ROUTES } from "src/app/types";
import Container from "src/components/Container";
import CareProviderInTake from "src/components/CareProviderInTake/CareProviderInTake";
import { useNotification } from "src/hooks/useNotification";
import {
  IBookAppointmentForm,
  ICareMemberAvailableDatesAndTimes,
  IProfileSetUpCardForm,
} from "src/types";

const CareProviderInTakePage: FC = () => {
  const [selectedTime, setSelectedTime] = useState("");

  const history = useHistory();
  const { handleSuccess, handleError } = useNotification();
  const { providerId } = useParams<{ providerId: string }>();

  const register = useRegister();
  const bookAppointment = useBookAppointment();
  const { data: careProvider } = useGetCareProvider(providerId);
  const { data: availability } = useCareMemberAvailableTimesByEmail(
    careProvider?.email
  );

  const handleSelect = (time: string) => {
    setSelectedTime(time);
  };

  const getRegisterForm = (form: IProfileSetUpCardForm): any => ({
    email: form.email,
    firstName: form.firstName,
    preferredName: form.preferredName,
    lastName: form.lastName,
    phone: form.phone,
    password: form.password,
    billingAddress: form.billingAddress,
    dob: form.dob,
    insurances: [form.insurance],
    stripeID: form.paymentId,
    confirmPassword: form.confirmPassword,
  });

  const getAppointmentForm = (
    form: IProfileSetUpCardForm,
    availability: ICareMemberAvailableDatesAndTimes
  ): IBookAppointmentForm => ({
    email: form.email,
    calendarID: availability.calendarID,
    datetime: selectedTime,
    firstName: form.firstName,
    lastName: form.lastName,
    phone: form.phone,
    smsOptIn: true,
  });

  const handleSubmit = async (form: IProfileSetUpCardForm) => {
    if (!availability) {
      handleError(null, "There is no availability.");
      return;
    }
    if (!selectedTime) {
      handleError(null, "Please select a time.");
      return;
    }

    const registerForm = getRegisterForm(form);
    const appointmentForm = getAppointmentForm(form, availability);

    try {
      await register(registerForm);
      handleSuccess("Successfully registered an account");
      const { data } = await bookAppointment.mutateAsync(appointmentForm);
      handleSuccess("Successfully scheduled an appointment");
      history.push(`${ROUTES.BOOKING}/${providerId}/confirm`, data);
    } catch (error) {
      handleError(error);
    }
  };

  const { availableDates = [] } = availability || {};

  return (
    <Container showIcon>
      <Grid container item xl={6} lg={8} md={10}>
        {careProvider && (
          <CareProviderInTake
            availableDates={availableDates}
            careProvider={careProvider}
            selectedTime={selectedTime}
            onSelect={handleSelect}
            onSubmit={handleSubmit}
          />
        )}
      </Grid>
    </Container>
  );
};

export default CareProviderInTakePage;
