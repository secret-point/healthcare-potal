import { FC, FormEvent, useState, useMemo } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TFieldRow } from "../types/general";
import Button from "./Button";
import FieldComponent from "./FieldComponent";
import { useColorStyles } from "./useCommonStyles";
import { getFormErrorMessages } from "../utils/helper";

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
      padding: theme.spacing(4, 4, 2),
    },

    dialogContent: {
      overflow: "hidden",
    },
  })
);

interface UpdateFormProps {
  rows: TFieldRow[];
  onClose: () => void;
  onSave: (e: FormEvent) => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ onClose, onSave, rows }) => {
  const {
    trigger,
    formState: { errors },
  } = useFormContext();
  const colorClasses = useColorStyles();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const result = await trigger();
    if (!result) {
      return;
    }

    onSave(e);
  };

  const errorMessages = useMemo(() => getFormErrorMessages(errors), [errors]);

  return (
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

      <Grid container spacing={1}>
        {errorMessages.map((message, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="body2" className={colorClasses.accentRed}>
              {message}
            </Typography>
          </Grid>
        ))}
      </Grid>

      <DialogActions>
        <Button text="Cancel" fullWidth={false} onClick={onClose} />
        <Button
          text="Save"
          type="submit"
          color="primary"
          fullWidth={false}
          onClick={handleSave}
        />
      </DialogActions>
    </form>
  );
};

interface UpdateDialogProps {
  open: boolean;
  title: string;
  rows: TFieldRow[];
  defaultValues: any;
  onClose: VoidFunction;
  onSave: (title: string, form: unknown) => void;
}

const UpdateDialog: FC<UpdateDialogProps> = ({
  open,
  title,
  rows,
  defaultValues,
  onClose,
  onSave,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const classes = useStyles();
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    setIsUpdating(true);
    try {
      const values = methods.getValues();
      await onSave(title, values);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      className={classes.dialog}
      onClose={onClose}
    >
      {isUpdating && <LinearProgress color="secondary" />}

      <Typography variant="h2" className={classes.dialogTitle}>
        {title}
      </Typography>

      <DialogContent className={classes.dialogContent}>
        <FormProvider {...methods}>
          <UpdateForm onClose={onClose} onSave={handleSave} rows={rows} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
