import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { User } from "src/types";
import { Theme } from "src/theme/types/createPalette";
import ProfileAvatar from "src/components/ProfileAvatar";

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

interface UserProfilePhotoProps {
  user: User;
  onDeletePicture: VoidFunction;
  onUploadFile: (file: File) => void;
}

const UserProfilePhoto: FC<UserProfilePhotoProps> = ({
  user,
  onDeletePicture,
  onUploadFile,
}) => {
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
          <ProfileAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            picture={user.profilePicture}
            width={64}
            height={64}
          />
          <ProfileAvatarUpload
            picture={user.profilePicture}
            onUploadFile={onUploadFile}
            onDeletePicture={onDeletePicture}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfilePhoto;
