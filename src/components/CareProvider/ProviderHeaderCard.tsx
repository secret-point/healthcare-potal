import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import { PrimaryButton } from "src/components/Button";
import CareProviderCardWithAvatar from "src/components/CareProvider/CareProviderCardWithAvatar";
import { useViewport } from "src/hooks/useViewport";
import { ICareMember } from "src/types";
import { formatUserNameAndTitle } from "src/utils";
import { ReactComponent as CalendarIcon } from "src/icons/Calendar.svg";

import CareProviderHighlights from "./CareProviderHighlights";

interface ProviderHeaderCardProps {
  careProvider: ICareMember;
  nextAvailableAt: Nullable<Date>;
  isLoadingAvailability: boolean;
  onClickBookAppointment: VoidFunction;
}

const ProviderHeaderCard: FC<ProviderHeaderCardProps> = ({
  careProvider,
  nextAvailableAt,
  isLoadingAvailability,
  onClickBookAppointment,
}) => {
  const { isMobile } = useViewport();
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
              <b>Next available appointment:&nbsp;</b>
              {isLoadingAvailability && (
                <CircularProgress
                  className={layoutClasses.ml1}
                  size={16}
                  color="secondary"
                />
              )}
              {nextAvailableAt
                ? dayjs(nextAvailableAt).format("MMMM DD YYYY on hh:mm A")
                : ""}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <PrimaryButton
            text="Book an appointment"
            fullWidth={isMobile}
            onClick={onClickBookAppointment}
          />
        </Grid>
      </Grid>
    </CareProviderCardWithAvatar>
  );
};

export default ProviderHeaderCard;
