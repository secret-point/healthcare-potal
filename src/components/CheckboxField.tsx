import clsx from "clsx";
import { ChangeEventHandler, FC, useEffect } from "react";
import { useFormContext } from "react-hook-form";
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
    "& span": {
      fontSize: 16,
      "&:last-child": {
        color: theme.palette.primaryNavy.main,
      },
    },
  },
  selectedControlLabel: {
    border: `1px solid ${theme.palette.secondaryGreen1.main}`,
    "& span:last-child": {
      color: theme.palette.secondaryGreen1.main,
    },
  },
  label: {
    "& span": {
      fontSize: 16,
    },
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
  const { register, getValues, setValue } = useFormContext();
  const isChecked = getValues(name);

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {}, [name]);

  const handleMUIChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(name, event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked || false}
          className={className}
          onChange={handleMUIChange}
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
