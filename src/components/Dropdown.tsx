import { FC, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { SelectOption } from "../types/general";

const useStyles = makeStyles(() => ({
  dropdown: {},
  formControl: {
    minWidth: "100%",
  },
}));

interface DropdownProps {
  name: string;
  label: string;
  placeholder?: string;
  validator?: any;
  options: SelectOption[];
  disabled?: boolean;
  onChange?: (name: string, value: string) => void;
  default?: any;
  [key: string]: any;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  name,
  validator,
  options,
  disabled,
  onChange,
  default: defaultValue,
}) => {
  const classes = useStyles();

  const myRef = useRef<HTMLInputElement>(null);

  const { watch, register, setValue } = useFormContext();
  const value = watch(name);

  const handleMUIChange = (event: any) => {
    const val = event.target.value;
    setValue(name, val);
    onChange?.(name, val);
  };

  useEffect(() => {
    register(name, validator); // custom register react-select

    if (defaultValue) {
      setValue(name, defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, name]);

  if (!options || options.length === 0) {
    return <div />;
  }

  const displayLabel = validator?.required ? `${label} (*required)` : label;

  return (
    <div className={classes.dropdown} ref={myRef}>
      <FormControl variant="standard" className={classes.formControl}>
        <InputLabel>{displayLabel}</InputLabel>
        <Select
          name={name}
          label={displayLabel}
          value={value || defaultValue || ""}
          onChange={handleMUIChange}
          onOpen={() => setValue(name, value)}
          disabled={disabled}
        >
          {options.map((option, i) => (
            <MenuItem key={i} value={option.code}>
              {option.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
