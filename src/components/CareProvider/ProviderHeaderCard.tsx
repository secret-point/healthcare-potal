import clsx from "clsx";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import Button from "src/components/Button";
import ProfileAvatar from "src/components/ProfileAvatar";
import { formatUserNameAndTitle } from "src/utils/helper";
import { ICareMember } from "src/types";
import { Theme } from "src/theme/types/createPalette";
import { ReactComponent as CalendarIcon } from "src/icons/Calendar.svg";

import CareProviderHighlights from "./CareProviderHighlights";

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

    bookAppointmentButton: {
      background: `${theme.palette.secondaryGreen1.main} !important`,
      borderRadius: theme.spacing(1),
      textTransform: "none",
      padding: theme.spacing(1.5, 2),

      "& .MuiTypography-root": {
        color: "white !important",
      },
    },
  })
);

interface ProviderHeaderCardProps {
  careProvider: ICareMember;
  onClickBookAppointment: VoidFunction;
}

const ProviderHeaderCard: FC<ProviderHeaderCardProps> = ({
  careProvider,
  onClickBookAppointment,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

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
            Hello, I&apos;m&nbsp;
            <b>{formatUserNameAndTitle(careProvider)}</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <CareProviderHighlights careProvider={careProvider} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle2" className={colorClasses.primaryNavy}>
            {careProvider.bio}
          </Typography>
        </Grid>

        <Grid item xs={12} className={layoutClasses.mb1}>
          <Box display="flex" alignItems="center">
            <CalendarIcon />

            <Typography
              variant="subtitle2"
              className={clsx(colorClasses.secondaryNavy1, layoutClasses.ml2)}
            >
              <b>Next available appointment:</b>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Button
            text="Book an appointment"
            className={classes.bookAppointmentButton}
            fullWidth={false}
            onClick={onClickBookAppointment}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProviderHeaderCard;
