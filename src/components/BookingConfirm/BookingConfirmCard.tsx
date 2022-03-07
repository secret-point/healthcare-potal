import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { useFontStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";
import { formatUserNameAndTitle } from "src/utils";

import { ReactComponent as DateIcon } from "src/icons/DateIcon.svg";
import { ReactComponent as TimeIcon } from "src/icons/TimeIcon.svg";
import { ReactComponent as VideoIcon } from "src/icons/VideoIcon.svg";

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

        <Grid item xs={12}>
          <Grid container>
            <Grid container alignItems="center">
              <DateIcon />
              <Typography variant="h5" className={fontClasses.font500}>
                January 19, 2022 (Wednesday)
              </Typography>
            </Grid>

            <Grid container alignItems="center">
              <TimeIcon />
              <Typography variant="h5" className={fontClasses.font500}>
                03:00 PM ~ 03:50 PM (50 minutes)
              </Typography>
            </Grid>

            <Grid container alignItems="center">
              <VideoIcon />
              <Typography variant="h5" className={fontClasses.font500}>
                Link to video appointment is included in your confirmation
                email.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CareProviderCardWithAvatar>
  );
};

export default BookingConfirmCard;
