import { ChangeEvent, FC, useState } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatarUpload: {
      flex: "row",
      display: "flex",
      gap: theme.spacing(4),
    },
    buttonRole: {
      cursor: "pointer",
    },
    uploadLabel: {
      fontWeight: 500,
      color: theme.palette.secondaryGreen1.main,
    },
    deleteLabel: {
      fontWeight: 500,
      color: theme.palette.accentRed.main,
    },
  })
);

interface ProfileAvatarUploadProps {
  onUploadFile: (file: File) => void;
}

const ProfileAvatarUpload: FC<ProfileAvatarUploadProps> = ({
  onUploadFile,
}) => {
  const classes = useStyles();
  const [file, setFile] = useState<File>();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return null;
    setFile(file);
    onUploadFile(file);
  };

  const handleDeleteFile = () => {
    setFile(undefined);
  };

  return (
    <div className={classes.avatarUpload}>
      <Link component="label" className={classes.buttonRole}>
        <input
          id="json"
          name="json"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple={false}
          onChange={handleChangeFile}
        />
        <Typography variant="subtitle1" className={classes.uploadLabel}>
          Upload new picture
        </Typography>
      </Link>
      {file && (
        <Link
          component="label"
          className={classes.buttonRole}
          onClick={handleDeleteFile}
        >
          <Typography variant="subtitle1" className={classes.deleteLabel}>
            Delete picture
          </Typography>
        </Link>
      )}
    </div>
  );
};

export default ProfileAvatarUpload;
