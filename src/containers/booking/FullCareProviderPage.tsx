import { FC, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useAllCareProviderList } from "src/api/providerApi";
import Container from "src/components/Container";
import FullCareProviderCard from "src/components/CareProvider/FullCareProviderCard";
import { ROUTES } from "src/app/types";

const FullCareProviderPage: FC = () => {
  const history = useHistory();
  const { providerId } = useParams<{ providerId?: string }>();
  const { data: careProviders = [] } = useAllCareProviderList();

  const careProvider = useMemo(() => {
    return careProviders.find((provider) => provider._id === providerId);
  }, [careProviders, providerId]);

  const handleClickBookAppointment = () => {
    history.push(`${ROUTES.BOOKING}/${providerId}/intake`);
  };

  return (
    <Container showIcon>
      <Grid container item xl={6} lg={8} md={10}>
        {careProvider && (
          <FullCareProviderCard
            careProvider={careProvider}
            onClickBookAppointment={handleClickBookAppointment}
          />
        )}
      </Grid>
    </Container>
  );
};

export default FullCareProviderPage;
