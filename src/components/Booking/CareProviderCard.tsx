import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { FC } from "react";
import { Theme } from "src/theme/types/createPalette";
import { ICareMember } from "src/types";

import ProfileAvatar from "src/components/ProfileAvatar";
import { useLayoutStyles } from "../useCommonStyles";
import { formatUserNameAndTitle } from "src/utils/helper";

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
    },
  })
);

interface CareProviderCardProps {
  careProvider: ICareMember;
}

const CareProviderCard: FC<CareProviderCardProps> = ({ careProvider }) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default CareProviderCard;
