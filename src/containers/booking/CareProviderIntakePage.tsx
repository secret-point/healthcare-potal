import { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {
  useGetCareProvider,
  useCareMemberAvailabilitiesByEmail,
} from "src/api/providerApi";
import { ROUTES } from "src/app/types";
import Container from "src/components/Container";
import CareProviderInTake from "src/components/CareProviderInTake/CareProviderInTake";
import { IProfileSetUpCardForm } from "src/types";

const CareProviderInTakePage: FC = () => {
  const [selectedTime, setSelectedTime] = useState("");

  const history = useHistory();
  const { providerId } = useParams<{ providerId: string }>();

  const { data: careProvider } = useGetCareProvider(providerId);

  const { data: availability } = useCareMemberAvailabilitiesByEmail(
    careProvider?.email
  );

  const handleSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = (_form: IProfileSetUpCardForm) => {
    console.log(_form);
    history.push(`${ROUTES.BOOKING}/${providerId}/confirm`);
  };

  if (!availability) {
    return null;
  }

  const { availableDates } = availability;

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
