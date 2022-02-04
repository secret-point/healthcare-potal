import { FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";
import { useLayoutStyles } from "src/components/useCommonStyles";
import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        width: 640,
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(4, 4, 0),
      },

      "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
      },
    },

    dialogTitle: {
      padding: theme.spacing(4, 4, 0),
    },

    dialogContent: {
      overflow: "hidden",
    },

    closeButton: {
      "& .MuiTypography-root": {
        color: theme.palette.secondaryGreen1.main,
      },
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
  const layoutClasses = useLayoutStyles();

  return (
    <Dialog
      open={isOpen}
      maxWidth="lg"
      className={classes.dialog}
      onClose={onClose}
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3" className={layoutClasses.mb3}>
              Date of birth does not match your record.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Please enter the correct date of birth.
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          text="Close"
          color="primary"
          className={classes.closeButton}
          fullWidth={false}
          onClick={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DateOfBirthNotMatchDialog;
