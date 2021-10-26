import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { User } from "../../types";
import { Theme } from "../../theme/types/createPalette";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileAvatarUpload from "./ProfileAvatarUpload";
import { useUploadFile } from "../../api";

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
  const uploadFile = useUploadFile();

  const handleUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("fileTitle", file.name);
    formData.append("memberID", user.memberID);
    formData.append("documentType", "Avatar");
    await uploadFile.mutate(formData);
  };

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
          <ProfileAvatarUpload onUploadFile={handleUploadFile} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PhotoInformation;
