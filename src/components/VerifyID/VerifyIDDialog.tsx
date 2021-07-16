import { FC, useState } from "react";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";
import Button from "../Button";
import UploadID from "./UploadID";
import InitialStep from "./InitialStep";
import { VerifySteps } from "./constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        width: 640,
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(0, 4),
      },

      "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
      },
    },

    dialogTitle: {
      padding: theme.spacing(4, 4, 3),
    },

    topBanner: {
      height: 216,
      backgroundSize: "cover",
      backgroundImage: "url('/images/id-banner.png')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },

    button: {
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface VerifyIDDialogProps {
  open: boolean;
  onClose: VoidFunction;
}

const VerifyIDDialog: FC<VerifyIDDialogProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const [file, setFile] = useState<File>();
  const [step, setStep] = useState(VerifySteps.INTIAL_STEP);

  const handleNextStep = () => {
    switch (step) {
      case VerifySteps.INTIAL_STEP:
        setStep(VerifySteps.UPLOAD_ID);
        break;
      case VerifySteps.UPLOAD_ID:
        setStep(VerifySteps.FINAL);
        break;
      default:
        setStep(VerifySteps.UPLOAD_ID);
        break;
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      className={classes.dialog}
      onClose={onClose}
    >
      <Box width={1} className={classes.topBanner} />

      <Typography variant="h2" className={classes.dialogTitle}>
        Verify your ID
      </Typography>

      <DialogContent>
        {step === VerifySteps.INTIAL_STEP && (
          <InitialStep
            onUploadID={handleNextStep}
            onSkipVerification={onClose}
          />
        )}
        {step === VerifySteps.UPLOAD_ID && (
          <UploadID file={file} onSelectFile={setFile} />
        )}
        {step === VerifySteps.FINAL && (
          <Grid item xs={12}>
            <Typography variant="body1">
              We will be verifying your ID within 1 business day. Your Care
              Coordinator will reach out to you if we encounter any issues
              verifying your identity.
            </Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          text={step === VerifySteps.FINAL ? "Close" : "Cancel"}
          fullWidth={false}
          textClassName={classes.button}
          onClick={onClose}
        />
        {step === VerifySteps.UPLOAD_ID && file && (
          <Button
            text="Next"
            fullWidth={false}
            textClassName={classes.button}
            onClick={handleNextStep}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default VerifyIDDialog;
