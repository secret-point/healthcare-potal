import clsx from "clsx";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { PrimaryButton } from "src/components/Button";
import ProfileAvatar from "src/components/ProfileAvatar";
import { useViewport } from "src/hooks/useViewport";
import { formatUserNameAndTitle } from "src/utils/helper";
import { Theme } from "src/theme/types/createPalette";
import { ICareMemberWithMatchings } from "src/types";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";

import CareProviderHighlights from "./CareProviderHighlights";
import ChipsList from "./ChipsList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: "white",
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(4),
    },

    namingBox: {
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(2),
      gap: theme.spacing(1),
      overflow: "hidden",
    },

    header: {
      display: "flex",
      flexDirection: "row",
    },

    matching: {
      color: theme.palette.secondary.main,
      display: "flex",
      alignItems: "center",
    },

    matchingTypo: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    viewProfileBox: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
    },

    mobileViewProfileBox: {
      flexDirection: "column",
    },
  })
);

interface SmallCareProviderCardProps {
  careProvider: ICareMemberWithMatchings;
  className?: string;
  onClickProfile: (id: string) => void;
}

const SmallCareProviderCard: FC<SmallCareProviderCardProps> = ({
  careProvider,
  className,
  onClickProfile,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const { isMobile } = useViewport();

  return (
    <Box className={clsx(classes.container, className)}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.header}>
          <ProfileAvatar
            width={isMobile ? 48 : 90}
            height={isMobile ? 48 : 90}
            firstName={careProvider.firstName}
            lastName={careProvider.lastName}
            picture={careProvider.profilePic}
          />

          <Box className={clsx(layoutClasses.ml2, classes.namingBox)}>
            <Typography variant="h3">
              {formatUserNameAndTitle(careProvider)}
            </Typography>

            {careProvider.matchings.map((matching) => (
              <Box key={matching} className={classes.matching}>
                <CheckCircleIcon />
                <Typography
                  color="secondary"
                  variant="body1"
                  className={clsx(
                    fontClasses.fontBold,
                    layoutClasses.ml1,
                    classes.matchingTypo
                  )}
                >
                  {matching}
                </Typography>
              </Box>
            ))}

            <CareProviderHighlights careProvider={careProvider} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            className={colorClasses.secondaryNavy1}
          >
            {careProvider.bio}
          </Typography>
        </Grid>

        {careProvider.specialty.length ? (
          <Grid item xs={12}>
            <Typography
              variant="body1"
              className={clsx(
                colorClasses.primaryNavy,
                fontClasses.fontBold,
                layoutClasses.mb1
              )}
            >
              Specialties
            </Typography>
            <ChipsList
              chips={careProvider.specialty
                .filter((speciality) => speciality)
                .slice(0, 10)}
            />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid
          item
          xs={12}
          className={clsx(
            classes.viewProfileBox,
            isMobile && classes.mobileViewProfileBox
          )}
        >
          <PrimaryButton
            text="View Profile"
            fullWidth={isMobile}
            onClick={() => onClickProfile(careProvider._id)}
          />

          <Typography className={colorClasses.secondaryNavy1}>
            Next available appointment in 3 days
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SmallCareProviderCard;
