import { FC, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import {
  useAllCareProviderList,
  useCareMemberAvailabilitiesByEmail,
} from "src/api/providerApi";
import Container from "src/components/Container";
import CareProviderInTake from "src/components/CareProviderInTake/CareProviderInTake";

const CareProviderInTakePage: FC = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const { providerId } = useParams<{ providerId?: string }>();

  const { data: careProviders = [] } = useAllCareProviderList();

  const careProvider = useMemo(() => {
    return careProviders.find((provider) => provider._id === providerId);
  }, [careProviders, providerId]);

  const { data: availability } = useCareMemberAvailabilitiesByEmail(
    careProvider?.email
  );

  const handleSelect = (time: string) => {
    setSelectedTime(time);
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
          />
        )}
      </Grid>
    </Container>
  );
};

export default CareProviderInTakePage;
