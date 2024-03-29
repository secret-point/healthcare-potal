import { FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {
  useGetCareProvider,
  useCareMemberAvailableTimesByEmail,
} from "src/api/providerApi";
import Container from "src/components/Container";
import FullCareProviderCard from "src/components/CareProvider/FullCareProviderCard";
import { ROUTES } from "src/app/types";

const FullCareProviderPage: FC = () => {
  const history = useHistory();
  const { providerId } = useParams<{ providerId: string }>();

  const { data: provider } = useGetCareProvider(providerId);

  const { data: availability, isLoading } = useCareMemberAvailableTimesByEmail(
    provider?.email
  );

  const nextAvailable =
    availability?.availableDates?.[0]?.availableTimes?.[0].time;

  const nextAvailableAt = nextAvailable ? new Date(nextAvailable) : null;

  const handleClickBookAppointment = () => {
    history.push(`${ROUTES.BOOKING}/${providerId}/intake`);
  };

  return (
    <Container showIcon>
      <Grid container item xl={6} lg={8} md={10}>
        {provider && (
          <FullCareProviderCard
            careProvider={{
              ...provider,
              isNotAvailable: false,
              isAvailabilityLoading: isLoading,
              matchings: [],
              availableDate: nextAvailableAt || undefined,
            }}
            onClickBookAppointment={handleClickBookAppointment}
          />
        )}
      </Grid>
    </Container>
  );
};

export default FullCareProviderPage;
