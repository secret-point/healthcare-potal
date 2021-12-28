import clsx from "clsx";
import dotProp from "dot-prop";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",

      "& .MuiInputLabel-root": {
        fontSize: 16,
        color: theme.palette.secondaryNavy1.main,
      },

      "& .MuiOutlinedInput-multiline": {
        padding: theme.spacing(3),
      },
      "& .MuiInputBase-root": {
        borderRadius: theme.spacing(1),
        background: "white",
      },
      "& .MuiInputBase-root.Mui-disabled": {
        backgroundColor: "#E2E2E2",
      },
      "& .MuiInputBase-input": {
        fontFamily: "DM Sans",
        fontSize: 16,
        lineHeight: 1.3,
        fontWeight: "normal",
        color: theme.palette.primaryNavy.main,

        "&::placeholder": {
          color: theme.palette.primaryNavy.main,
          opacity: 1,
        },
      },
      "& .MuiOutlinedInput-input:not(.MuiOutlinedInput-inputMultiline)": {
        padding: theme.spacing(2),
      },
      "& .MuiFormLabel-root.Mui-focused": {
        color: theme.palette.secondary.main,
      },
      "& .MuiOutlinedInput-root.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.secondary.main,
          borderWidth: 1,
        },
      },
      "& .MuiOutlinedInput-root.Mui-error": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.accentRed.main,
        },
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
        height: 32,
        fontSize: 16,
        display: "flex",
        transform: "none",
        position: "relative",
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
  InputProps,
  InputLabelProps = { shrink: true },
  isTopLabel,
  ...props
}: TextInputProps) {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const value = watch(name);
  const hasError = Boolean(dotProp.get(errors, name));

  useEffect(() => {
    register(name, validator); // custom register react-select
    setValue(name, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, name]);

  const handleTogglePasswordShow = () => setShowPassword((show) => !show);

  const endAdornment =
    type === "password" ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePasswordShow}
          edge="end"
        >
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <Controller
      defaultValue={value || ""}
      as={
        <TextField
          id={name}
          type={type === "password" && showPassword ? "text" : type}
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
          className={clsx(className, classes.textField)}
          InputLabelProps={InputLabelProps}
          InputProps={
            InputProps || {
              endAdornment,
            }
          }
          {...register(name, validator)}
          {...props}
        />
      }
      name={name}
      control={control}
    />
  );
}
