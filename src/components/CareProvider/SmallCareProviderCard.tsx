import clsx from "clsx";
import { FC } from "react";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { ROUTES } from "src/app/types";
import Button from "src/components/Button";
import ProfileAvatar from "src/components/ProfileAvatar";
import { formatUserNameAndTitle } from "src/utils/helper";
import { Theme } from "src/theme/types/createPalette";
import { ICareMemberWithMatchings } from "src/types";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";

import CareProviderHighlights from "./CareProviderHighlights";
import CareProviderSpecialities from "./CareProviderSpecialities";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(4),
    },

    namingBox: {
      display: "flex",
      flexDirection: "column",
      marginLeft: theme.spacing(2),
      gap: theme.spacing(1),
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

    viewProfileBox: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
    },

    viewProfileButton: {
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

interface SmallCareProviderCardProps {
  careProvider: ICareMemberWithMatchings;
  className?: string;
}

const SmallCareProviderCard: FC<SmallCareProviderCardProps> = ({
  careProvider,
  className,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const handleClickViewProfile = () => {
    history.push(`${ROUTES.BOOKING}/${careProvider._id}`);
  };

  return (
    <Card className={clsx(layoutClasses.padding4, className)}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.header}>
          <ProfileAvatar
            width={90}
            height={90}
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
                  className={clsx(fontClasses.fontBold, layoutClasses.ml1)}
                >
                  {matching}
                </Typography>
              </Box>
            ))}

            <CareProviderHighlights careProvider={careProvider} />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" className={colorClasses.secondaryNavy1}>
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
            <CareProviderSpecialities careProvider={careProvider} />
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} className={classes.viewProfileBox}>
          <Button
            text="View Profile"
            className={classes.viewProfileButton}
            fullWidth={false}
            onClick={handleClickViewProfile}
          />

          <Typography className={colorClasses.secondaryNavy1}>
            Next available appointment in 3 days
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SmallCareProviderCard;
