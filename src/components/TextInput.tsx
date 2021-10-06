import clsx from "clsx";
import dotProp from "dot-prop";
import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",

      "& .MuiOutlinedInput-multiline": {
        padding: theme.spacing(3),
      },
      "& .MuiInputBase-root": {
        borderRadius: theme.spacing(1),
      },
      "& .MuiInputBase-input": {
        fontFamily: "DM Sans",
        fontSize: 18,
        lineHeight: 1.3,
        fontWeight: "normal",
        color: theme.palette.secondaryNavy2.main,

        "&::placeholder": {
          color: theme.palette.secondaryNavy2.main,
          opacity: 1,
        },
      },
      "& .MuiOutlinedInput-input:not(.MuiOutlinedInput-inputMultiline)": {
        padding: theme.spacing(2),
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

    topLabelField: {
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        height: 32,
        fontSize: 16,
        display: "flex",
        transform: "translate(0px, -32px)",
        alignItems: "center",
      },
      "& .MuiOutlinedInput-root fieldset.MuiOutlinedInput-notchedOutline ": {
        top: 0,
        "& legend": {
          height: 0,
          "& span": {
            display: "none",
          },
        },
      },
    },
  })
);

type TextInputProps = TextFieldProps & {
  name: string;
  validator?: any;
  isTopLabel?: boolean;
};

export default function TextInput({
  name,
  label,
  variant = "outlined",
  validator = {},
  helperText,
  className,
  type,
  required,
  isTopLabel,
  ...props
}: TextInputProps) {
  const classes = useStyles();
  const colorClasses = useColorStyles()();
  const layoutClasses = useLayoutStyles()();
  const {
    control,
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const values = getValues();
  const started = dotProp.get(values, name);
  const hasError = Boolean(dotProp.get(errors, name));

  return (
    <Controller
      defaultValue={started || ""}
      as={
        <TextField
          id={name}
          type={type}
          label={
            label ? (
              <>
                {label}
                {required && (
                  <b
                    className={clsx(colorClasses.accentRed, layoutClasses.ml1)}
                  >
                    *
                  </b>
                )}
              </>
            ) : null
          }
          variant={variant}
          error={hasError}
          className={clsx(
            className,
            classes.textField,
            isTopLabel && classes.topLabelField
          )}
          {...register(name, validator)}
          {...props}
        />
      }
      name={name}
      control={control}
    />
  );
}
