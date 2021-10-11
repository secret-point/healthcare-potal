import clsx from "clsx";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core";

import { Theme } from "../theme/types/createPalette";

type StyleProps = {
  color: "primary" | "secondary" | "default" | undefined;
};

const useStyles = makeStyles((theme: Theme) => ({
  controlLabel: {
    margin: 0,
    width: "100%",
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
    border: `1px solid rgba(0, 0, 0, 0.23)`,
  },
  selectedControlLabel: {
    border: `1px solid ${theme.palette.secondaryGreen1.main}`,
    "& .MuiTypography-root": {
      color: theme.palette.secondaryGreen1.main,
    },
  },
  label: {
    fontSize: 16,
  },
  selectedLabel: {
    color: ({ color }: StyleProps) => theme.palette[color || "primary"].main,
  },
}));

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label: string;
  className?: string;
  disabled?: boolean;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  label,
  color,
  name,
  className,
}) => {
  const classes = useStyles({ color });
  const { control, watch } = useFormContext();
  const isChecked = watch(name);

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={(props) => (
            <Checkbox
              {...props}
              checked={props.value || false}
              onChange={(e) => props.onChange(e.target.checked)}
            />
          )}
          className={className}
          classes={{
            label: clsx(classes.label, isChecked && classes.selectedLabel),
          }}
        />
      }
      label={label}
      className={clsx(
        classes.controlLabel,
        isChecked && classes.selectedControlLabel
      )}
    />
  );
};

export default CheckboxField;
