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
      id={name}
      label={label}
      className={className}
      classes={{
        label: clsx(classes.label, isChecked && classes.selectedLabel),
      }}
      control={
        <Controller
          defaultValue={false}
          as={<Checkbox />}
          control={control}
          name={name}
        />
      }
    />
  );
};

export default CheckboxField;
