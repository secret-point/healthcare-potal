import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useAllCareProviderList } from "src/api/providerApi";
import Container from "src/components/Container";
import FullCareProviderCard from "src/components/CareProvider/FullCareProviderCard";

const FullCareProviderPage: FC = () => {
  const { providerId } = useParams<{ providerId?: string }>();
  const { data: careProviders = [] } = useAllCareProviderList();

  const careProvider = useMemo(() => {
    return careProviders.find((provider) => provider._id === providerId);
  }, [careProviders, providerId]);

  return (
    <Container showIcon>
      <Grid container xl={6} lg={8} md={10}>
        {careProvider && <FullCareProviderCard careProvider={careProvider} />}
      </Grid>
    </Container>
  );
};

export default FullCareProviderPage;
