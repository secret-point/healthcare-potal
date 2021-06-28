import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";

import TextField, { OutlinedTextFieldProps } from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

import { Theme } from "../theme/types/createPalette";
import { getCapitalizedValue } from "../utils/string";

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
        color: theme.palette.primaryNavy.main,
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondaryNavy2.main,
          borderWidth: 1,
        },
      },
    },
  })
);

interface TextInputProps extends OutlinedTextFieldProps {
  name: string;
  validator?: any;
  transformation?: any;
}

export default function TextInput({
  name,
  label,
  variant = "outlined",
  validator = {},
  transformation = {},
  helperText,
  className,
  type,
  required,
  onChange,
  ...props
}: TextInputProps) {
  const classes = useStyles();
  const {
    control,
    register: formRegister,
    setValue,
    getValues,
  } = useFormContext();

  const register: any = formRegister;

  const values = getValues();
  const started = values[name];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    if (transformation.capitalize) {
      value = getCapitalizedValue(value);
    } else if (transformation.custom) {
      value = transformation.custom(value);
    }
    setValue(name, value);
    onChange?.(e);
  };

  return (
    <Controller
      defaultValue={started || ""}
      render={() => (
        <TextField
          id={name}
          type={type}
          label={label}
          variant={variant}
          className={clsx(className, classes.textField)}
          onChange={handleChange}
          {...register(name, validator)}
          {...props}
        />
      )}
      name={name}
      control={control}
    />
  );
}
