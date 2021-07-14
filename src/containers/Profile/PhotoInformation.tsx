import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { User } from "../../types";
import { Theme } from "../../theme/types/createPalette";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileAvatarUpload from "./ProfileAvatarUpload";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    informationWrapper: {
      padding: theme.spacing(2, 4, 2, 3),
      background: "white",
      border: `1px solid ${theme.palette.backgroundGray.main}`,
      boxSizing: "border-box",
    },
  })
);

interface PhotoInformationProps {
  user: User;
}

const PhotoInformation: FC<PhotoInformationProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Profile Photo</Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.informationWrapper}
        >
          <ProfileAvatar user={user} width={64} height={64} />
          <ProfileAvatarUpload />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhotoInformation;