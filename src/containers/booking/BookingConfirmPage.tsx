import { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { useGetCareProvider } from "src/api/providerApi";
import { ROUTES } from "src/app/types";
import Container from "src/components/Container";
import BookingConfirmCard from "src/components/BookingConfirm/BookingConfirmCard";
import BookingConfirmNextStepsCard from "src/components/BookingConfirm/BookingConfirmNextStepsCard";

const BookingConfirmPage: FC = () => {
  const history = useHistory();
  const { providerId } = useParams<{ providerId: string }>();

  const { data: careProvider } = useGetCareProvider(providerId);

  const handleSignIn = () => {
    history.push(ROUTES.LOGIN);
  };

  if (!history.location.state) {
    history.push(ROUTES.LOGIN);
    return null;
  }

  const { datetime, duration } = (history.location.state || {}) as any;

  return (
    <Container showIcon>
      {careProvider && (
        <Grid container item xl={6} lg={8} md={10} spacing={4}>
          <Grid item xs={12}>
            <BookingConfirmCard
              careProvider={careProvider}
              bookedAt={new Date(datetime)}
              duration={Number(duration)}
            />
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
