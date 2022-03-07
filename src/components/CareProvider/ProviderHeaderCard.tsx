import clsx from "clsx";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import Button from "src/components/Button";
import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { ICareMember } from "src/types";
import { formatUserNameAndTitle } from "src/utils";
import { Theme } from "src/theme/types/createPalette";
import { ReactComponent as CalendarIcon } from "src/icons/Calendar.svg";

import CareProviderHighlights from "./CareProviderHighlights";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    <CareProviderCardWithAvatar careProvider={careProvider}>
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
    </CareProviderCardWithAvatar>
  );
};

export default ProviderHeaderCard;
