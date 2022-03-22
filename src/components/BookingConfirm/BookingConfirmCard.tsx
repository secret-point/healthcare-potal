import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";
import { formatUserNameAndTitle } from "src/utils";

import { ReactComponent as DateIcon } from "src/icons/DateIcon.svg";
import { ReactComponent as TimeIcon } from "src/icons/TimeIcon.svg";
import { ReactComponent as VideoIcon } from "src/icons/VideoIcon.svg";

interface BookingConfirmCardProps {
  careProvider: ICareMember;
  bookedAt: Date;
  duration: number;
}

const BookingConfirmCard: FC<BookingConfirmCardProps> = ({
  careProvider,
  bookedAt,
  duration,
}) => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const typoClass = clsx(fontClasses.font500, layoutClasses.ml1);

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
              <Typography variant="h5" className={typoClass}>
                {dayjs(bookedAt).format("MMMM DD, YYYY (dddd)")}
              </Typography>
            </Grid>

            <Grid container alignItems="center">
              <TimeIcon />
              <Typography variant="h5" className={typoClass}>
                {`${dayjs(bookedAt).format("hh:mm A")} ~ ${dayjs(bookedAt)
                  .add(duration, "minutes")
                  .format("hh:mm A")} (${duration} minutes)`}
              </Typography>
            </Grid>

            <Grid container alignItems="center">
              <VideoIcon />
              <Typography variant="h5" className={typoClass}>
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
