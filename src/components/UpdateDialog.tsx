import dotProp from "dot-prop";
import { FC, FormEvent, useEffect, useMemo, useState } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TFieldRow } from "src/types/general";

import Button from "./Button";
import FieldComponent from "./FieldComponent";
import { useColorStyles } from "./useCommonStyles";
import { getFormErrorMessages } from "src/utils/helper";
import PasswordUpdateResult from "./PasswordUpdateResult";

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

interface UpdateFormProps {
  isPasswordForm: boolean;
  rows: TFieldRow[];
  onClose: () => void;
  onSave: (e: FormEvent) => void;
}

const UpdateForm: FC<UpdateFormProps> = ({
  isPasswordForm,
  onClose,
  onSave,
  rows,
}) => {
  const {
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext();
  const colorClasses = useColorStyles();
  const [extraError, setExtraError] = useState("");

  const values = getValues();
  const password = dotProp.get(values, "password") as string;
  const confirmPassword = dotProp.get(values, "confirmPassword") as string;
  const showPasswordResult = Boolean(password || confirmPassword);
  const shouldPasswordMatch =
    Boolean(password) &&
    Boolean(confirmPassword) &&
    password === confirmPassword;
  const shouldLongerThan8 = Boolean(password) && password.length >= 8;

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const result = await trigger();
    if (!result) {
      return;
    }
    if (showPasswordResult && (!shouldLongerThan8 || !shouldPasswordMatch)) {
      return;
    }

    onSave(e);
  };

  useEffect(() => {
    if (!isPasswordForm) {
      setExtraError("");
    }
  }, [isPasswordForm]);

  const errorMessages = useMemo(
    () =>
      [...getFormErrorMessages(errors), extraError].filter(
        (message) => message
      ),
    [errors, extraError]
  );

  return (
    <form onSubmit={handleSave}>
      <Grid container spacing={2}>
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

      {showPasswordResult && (
        <PasswordUpdateResult
          shouldLongerThan8={shouldLongerThan8}
          shouldPasswordMatch={shouldPasswordMatch}
        />
      )}

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
          <UpdateForm
            isPasswordForm={/password/.test(title)}
            onClose={onClose}
            onSave={handleSave}
            rows={rows}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
