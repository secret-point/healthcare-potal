import { FC } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useFontStyles } from "src/components/useCommonStyles";
import ProfileAvatar from "src/components/ProfileAvatar";
import { Theme } from "src/theme/types/createPalette";
import { formatUserNameAndTitle } from "src/utils/helper";
import { ICareMember } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      padding: theme.spacing(4),
      overflow: "visible",
    },

    profileAvatar: {
      position: "absolute",
      right: theme.spacing(4),
      top: theme.spacing(-7.5),
    },
  })
);

interface BookAppointmentCardProps {
  careProvider: ICareMember;
}

const BookAppointmentCard: FC<BookAppointmentCardProps> = ({
  careProvider,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  return (
    <Card className={classes.card}>
      <ProfileAvatar
        width={120}
        height={120}
        firstName={careProvider.firstName}
        lastName={careProvider.lastName}
        picture={careProvider.profilePic}
        className={classes.profileAvatar}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={fontClasses.fontNormal}>
            Book an appointment with&nbsp;
            <b>{formatUserNameAndTitle(careProvider)}</b>
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookAppointmentCard;
