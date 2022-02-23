import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { FC } from "react";
import { Theme } from "src/theme/types/createPalette";
import { ICareMemberWithMatchings } from "src/types";

import ProfileAvatar from "src/components/ProfileAvatar";
import { formatUserNameAndTitle } from "src/utils/helper";
import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import CareProviderHighlights from "./CareProviderHighlights";

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
  })
);

interface CareProviderCardProps {
  careProvider: ICareMemberWithMatchings;
}

const CareProviderCard: FC<CareProviderCardProps> = ({ careProvider }) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container className={classes.container}>
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
    </Grid>
  );
};

export default CareProviderCard;
