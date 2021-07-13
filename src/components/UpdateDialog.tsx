import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TFieldRow } from "../types/general";
import Button from "./Button";
import TextInput from "./TextInput";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        width: 640,
      },

      "& .MuiDialogTitle-root": {
        padding: theme.spacing(4, 4, 2),
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(0, 4),
      },

      "& .MuiDialogActions-root": {
        padding: theme.spacing(4),
      },
    },
  })
);

interface UpdateDialogProps {
  open: boolean;
  title: string;
  rows: TFieldRow[];
  onClose: VoidFunction;
}

const UpdateDialog: FC<UpdateDialogProps> = ({
  open,
  title,
  rows,
  onClose,
}) => {
  const classes = useStyles();
  const methods = useForm({
    mode: "onBlur",
  });

  const handleSave = () => {};

  return (
    <Dialog open={open} maxWidth="lg" className={classes.dialog}>
      <DialogTitle>
        <Typography variant="h2">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          {rows.map((row) => (
            <Grid container key={row.row}>
              {row.fields.map((field) => (
                <Grid item key={field.path} xs={(field.xs || 12) as any}>
                  <TextInput
                    name={field.path}
                    label={field.label}
                    variant="standard"
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button text="Cancel" noPadding fullWidth={false} onClick={onClose} />
        <Button text="Save" noPadding fullWidth={false} onClick={handleSave} />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
