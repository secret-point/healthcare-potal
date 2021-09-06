import { FC, FormEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TFieldRow } from "../types/general";
import Button from "./Button";
import FieldComponent from "./FieldComponent";

const useStyles = makeStyles((theme) =>
  createStyles({
    dialog: {
      "& .MuiDialog-paper": {
        width: 640,
      },

      "& .MuiDialogContent-root": {
        padding: theme.spacing(3, 4, 0),
      },

      "& .MuiDialogActions-root": {
        padding: theme.spacing(2),
      },
    },

    dialogTitle: {
      padding: theme.spacing(4, 4, 2),
    },
  })
);

interface UpdateDialogProps {
  open: boolean;
  title: string;
  rows: TFieldRow[];
  onClose: VoidFunction;
  onSave: (form: unknown) => void;
}

const UpdateDialog: FC<UpdateDialogProps> = ({
  open,
  title,
  rows,
  onClose,
  onSave,
}) => {
  const classes = useStyles();
  const methods = useForm({
    mode: "onBlur",
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    const values = methods.getValues();
    onSave(values);
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      className={classes.dialog}
      onClose={onClose}
    >
      <Typography variant="h2" className={classes.dialogTitle}>
        {title}
      </Typography>

      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSave}>
            <Grid container spacing={4}>
              {rows.map((row) => (
                <Grid item key={row.row} xs={12}>
                  <Grid container spacing={3}>
                    {row.fields.map((field) => (
                      <Grid item key={field.path} xs={(field.xs || 12) as any}>
                        <FieldComponent field={field} variant="outlined" />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button text="Cancel" fullWidth={false} onClick={onClose} />
        <Button text="Save" type="submit" fullWidth={false} />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateDialog;
