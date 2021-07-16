import { ChangeEvent, FC } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "../../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mb2: {
      marginBottom: theme.spacing(2),
    },
    uploadLabel: {
      fontWeight: 500,
      color: theme.palette.secondaryGreen1.main,
    },
    buttonRole: {
      cursor: "pointer",
    },
  })
);

interface UploadIDProps {
  file: File | undefined;
  onSelectFile: (file: File) => void;
}

const UploadID: FC<UploadIDProps> = ({ file, onSelectFile }) => {
  const classes = useStyles();

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return null;
    onSelectFile(file);
  };

  return (
    <Grid container>
      <Grid item xs={12} className={classes.mb2}>
        <Typography variant="body1">
          We accept any valid federal/state identification card with a clear
          photo of yourself. These include: Passport, Driver’s License, State
          ID, Military ID, etc.
        </Typography>
      </Grid>

      <Grid item xs={12} className={classes.mb2}>
        <Typography variant="body1">
          Please make sure your&nbsp;
          <b>all the information and the photo</b>
          &nbsp;on your ID card is clearly visible.
        </Typography>
      </Grid>

      <Grid item xs={12} role="button" tabIndex={0} className={classes.mb2}>
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
          <Typography variant="h6" className={classes.uploadLabel}>
            Upload ID
          </Typography>
        </Link>

        {file && <Typography variant="body1">{file.name}</Typography>}
      </Grid>
    </Grid>
  );
};

export default UploadID;
