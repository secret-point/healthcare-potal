import dayjs from "dayjs";
import { FC } from "react";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { Theme } from "src/theme/types/createPalette";
import { formatUserNameAndTitle } from "src/utils/helper";
import { ICareMember, ICareMemberAvailableDate } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    availabilityWrapper: {
      flexWrap: "wrap",
      overflow: "auto",
      gap: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    selectedTimeChip: {
      background: "#ECF5E4 !important",
    },
  })
);

const TimeChip = withStyles((theme) => ({
  root: {
    background: "white",
    border: "1px solid #E3E3E3",
    borderRadius: theme.spacing(1),
    cursor: "pointer",
  },
}))(Chip);

interface BookAppointmentCardProps {
  availableDates: ICareMemberAvailableDate[];
  careProvider: ICareMember;
  selectedTime: string;
  onSelect: (time: string) => void;
}

const BookAppointmentCard: FC<BookAppointmentCardProps> = ({
  availableDates,
  careProvider,
  selectedTime,
  onSelect,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <CareProviderCardWithAvatar careProvider={careProvider}>
      <Grid container spacing={2} className={layoutClasses.mb2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={fontClasses.fontNormal}>
            Book an appointment with&nbsp;
            <b>{formatUserNameAndTitle(careProvider)}</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2">
            Appointments are 50 minutes in length. You will not be charged
            before the appointment.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {availableDates.map((availableDate, index) => (
          <Grid key={availableDate.date} item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  {dayjs(availableDate.date).format("MMMM DD, YYYY (dddd)")}
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={12}
                className={classes.availabilityWrapper}
              >
                {availableDate.availableTimes.map((availableTime) => (
                  <TimeChip
                    key={availableTime.time}
                    label={dayjs(availableTime.time).format("hh:mm A")}
                    className={
                      selectedTime === availableTime.time
                        ? classes.selectedTimeChip
                        : ""
                    }
                    onClick={() => onSelect(availableTime.time)}
                  />
                ))}
              </Grid>

              {index < availableDates.length - 1 && (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </CareProviderCardWithAvatar>
  );
};

export default BookAppointmentCard;
