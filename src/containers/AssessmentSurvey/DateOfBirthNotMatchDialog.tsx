import { FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        width: 640,
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(4, 4, 0),
      },

      "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
      },
    },

    dialogTitle: {
      padding: theme.spacing(4, 4, 0),
    },

    dialogContent: {
      overflow: "hidden",
    },
  })
);

interface DateOfBirthNotMatchDialogProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

const DateOfBirthNotMatchDialog: FC<DateOfBirthNotMatchDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      maxWidth="lg"
      className={classes.dialog}
      onClose={onClose}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">
            Date of birth does not match your record.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Please enter the correct date of birth.
          </Typography>
        </Grid>
      </Grid>

      <DialogActions>
        <Button text="Cancel" fullWidth={false} onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default DateOfBirthNotMatchDialog;
