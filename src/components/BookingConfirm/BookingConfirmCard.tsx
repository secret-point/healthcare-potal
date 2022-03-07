import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { useFontStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";
import { formatUserNameAndTitle } from "src/utils";

interface BookingConfirmCardProps {
  careProvider: ICareMember;
}

const BookingConfirmCard: FC<BookingConfirmCardProps> = ({ careProvider }) => {
  const fontClasses = useFontStyles();
  return (
    <CareProviderCardWithAvatar careProvider={careProvider}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={fontClasses.fontNormal}>
            Your appointment with&nbsp;
            <b>{formatUserNameAndTitle(careProvider)}</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">
            You will receive confirmation of your appointment at your email.
          </Typography>
        </Grid>
      </Grid>
    </CareProviderCardWithAvatar>
  );
};

export default BookingConfirmCard;
