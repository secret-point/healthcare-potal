import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import dotProp from "dot-prop";

import TextField, { OutlinedTextFieldProps } from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import { Theme } from "../theme/types/createPalette";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",

      "& .MuiInputBase-root": {
        borderRadius: theme.spacing(2),
      },
      "& .MuiInputBase-input": {
        fontFamily: "DM Sans",
        fontSize: 18,
        lineHeight: 1.3,
        fontWeight: "normal",
        color: theme.palette.secondaryNavy2.main,
      },
      "& .MuiOutlinedInput-input": {
        padding: theme.spacing(2, 3),
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.distinctiveGray.main,
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: theme.palette.secondaryNavy2.main,
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondaryNavy2.main,
          borderWidth: 1,
        },
      },
      "& .MuiOutlinedInput-root.Mui-error": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.accentRed.main,
        },
      },
    },
  })
);

interface TextInputProps extends OutlinedTextFieldProps {
  name: string;
  validator?: any;
}

export default function TextInput({
  name,
  label,
  variant = "outlined",
  validator = {},
  helperText,
  className,
  type,
  required,
  ...props
}: TextInputProps) {
  const classes = useStyles();
  const {
    control,
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const values = getValues();
  const started = values[name];
  const error = dotProp.get(errors, name);

  return (
    <Controller
      defaultValue={started || ""}
      render={({ field }) => (
        <TextField
          id={name}
          type={type}
          label={label}
          variant={variant}
          error={Boolean(error)}
          className={clsx(className, classes.textField)}
          {...register(name, validator)}
          {...field}
          {...props}
        />
      )}
      name={name}
      control={control}
    />
  );
}
