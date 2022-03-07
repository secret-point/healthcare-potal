import { FC, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useAllCareProviderList } from "src/api/providerApi";
import { ROUTES } from "src/app/types";
import Container from "src/components/Container";
import BookingConfirmCard from "src/components/BookingConfirm/BookingConfirmCard";
import BookingConfirmNextStepsCard from "src/components/BookingConfirm/BookingConfirmNextStepsCard";

const BookingConfirmPage: FC = () => {
  const history = useHistory();
  const { providerId } = useParams<{ providerId?: string }>();

  const { data: careProviders = [] } = useAllCareProviderList();

  const careProvider = useMemo(() => {
    return careProviders.find((provider) => provider._id === providerId);
  }, [careProviders, providerId]);

  const handleSignIn = () => {
    history.push(ROUTES.LOGIN);
  };

  return (
    <Container showIcon>
      {careProvider && (
        <Grid container item xl={6} lg={8} md={10}>
          <Grid item xs={12}>
            <BookingConfirmCard careProvider={careProvider} />
          </Grid>

          <Grid item xs={12}>
            <BookingConfirmNextStepsCard onSignIn={handleSignIn} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookingConfirmPage;
