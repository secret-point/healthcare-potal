import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useAllCareProviderList } from "src/api/providerApi";
import Container from "src/components/Container";
import CareProviderInTake from "src/components/CareProviderInTake/CareProviderInTake";

const CareProviderInTakePage: FC = () => {
  const { providerId } = useParams<{ providerId?: string }>();
  const { data: careProviders = [] } = useAllCareProviderList();

  const careProvider = useMemo(() => {
    return careProviders.find((provider) => provider._id === providerId);
  }, [careProviders, providerId]);

  return (
    <Container showIcon>
      <Grid container item xl={6} lg={8} md={10}>
        {careProvider && <CareProviderInTake careProvider={careProvider} />}
      </Grid>
    </Container>
  );
};

export default CareProviderInTakePage;
