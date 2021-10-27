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
import { useUploadFile, useVerifyID } from "../../api";
import useAuth from "../../hooks/useAuth";

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
  const uploadFile = useUploadFile();
  const veirfyID = useVerifyID();
  const { user } = useAuth();
  const [file, setFile] = useState<File>();
  const [fileID, setFileID] = useState<string>();
  const [step, setStep] = useState(VerifySteps.INTIAL_STEP);

  const handleUploadFile = async (file: File) => {
    setFile(file);
    if (!user) return;

    const formData = new FormData();
    formData.append("upload", file);
    formData.append("fileTitle", file.name);
    formData.append("memberID", user._id);
    formData.append("documentType", "PhotoID");

    await uploadFile.mutate(formData, {
      onSuccess: ({ data: { fileID } }) => {
        setFileID(fileID);
      },
    });
  };

  const handleVerifyID = async () => {
    if (!fileID) return;
    try {
      await veirfyID.mutate(fileID);
    } catch (error) {
      // console.error(error);
    } finally {
      setStep(VerifySteps.FINAL);
    }
  };

  const handleNextStep = () => {
    switch (step) {
      case VerifySteps.INTIAL_STEP:
        setStep(VerifySteps.UPLOAD_ID);
        break;
      case VerifySteps.UPLOAD_ID:
      default:
        handleVerifyID();
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
          <UploadID file={file} onSelectFile={handleUploadFile} />
        )}
        {step === VerifySteps.FINAL && (
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              We will be verifying your ID within 1 business day. Your Care
              Coordinator will reach out to you if we encounter any issues
              verifying your identity.
            </Typography>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
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
