import clsx from "clsx";
import dotProp from "dot-prop";
import { FC, useEffect, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { Theme } from "src/theme/types/createPalette";
import { TDropItem } from "src/types/general";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropdown: {},
    formControl: {
      minWidth: "100%",
      "& .MuiOutlinedInput-root": {
        background: "white",
        borderRadius: theme.spacing(1),
      },
    },
    inputLabel: {
      "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
        height: 32,
        fontSize: 16,
        display: "flex",
        transform: "none",
        position: "relative",
        alignItems: "center",
        color: theme.palette.secondaryNavy1.main,
      },
      "&.MuiFormLabel-root.Mui-focused": {
        color: theme.palette.secondary.main,
      },
    },
    select: {
      "& .MuiSelect-select.MuiSelect-select": {
        display: "flex",
        alignItems: "center",
        fontSize: 16,
        padding: theme.spacing(2),
        background: "white",
        color: theme.palette.primaryNavy.main,
      },
      "& fieldset": {
        borderRadius: theme.spacing(1),
      },
    },
    placeholderSelect: {
      "& .MuiSelect-select.MuiSelect-select": {
        color: theme.palette.secondaryNavy2.main,
      },
    },
    menuItem: {
      fontSize: 16,
      color: theme.palette.primaryNavy.main,
    },
    selectMenuItem: {
      color: theme.palette.secondaryNavy2.main,
    },
  })
);

interface DropdownProps {
  name: string;
  label: string;
  placeholder?: string;
  validator?: any;
  options: TDropItem[];
  disabled?: boolean;
  variant?: "standard" | "outlined";
  required?: boolean;
  defaultValue?: any;
  multiple?: boolean;
  onChange?: (name: string, value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  name,
  validator,
  options,
  disabled,
  variant,
  required,
  multiple,
  placeholder,
  defaultValue,
  onChange,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const myRef = useRef<HTMLInputElement>(null);

  const {
    control,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    register(name, validator); // custom register react-select

    if (defaultValue) {
      setValue(name, value || defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, name]);

  const optionsByCode = useMemo(
    () =>
      options.reduce((optionsByCode: Data<TDropItem>, option: TDropItem) => {
        optionsByCode[option.code] = option;
        return optionsByCode;
      }, {} as Data<TDropItem>),
    [options]
  );

  if (!options || options.length === 0) {
    return <div />;
  }

  const handleMUIChange = (event: any) => {
    const val = event.target.value;
    setValue(name, val);
    onChange?.(name, val);
  };

  const getValue = () => {
    if (multiple) return value || defaultValue || [];
    return value || defaultValue || "";
  };

  const getOption = (code: string): TDropItem => optionsByCode[code];

  const hasError = Boolean(dotProp.get(errors, name));

  const selectedValue = getValue();

  const isPlaceHolderOption = Array.isArray(selectedValue)
    ? selectedValue.length === 0
    : !selectedValue;

  return (
    <div className={classes.dropdown} ref={myRef}>
      <FormControl variant={variant} className={classes.formControl}>
        {label && (
          <InputLabel
            id={name}
            shrink
            className={clsx(
              classes.inputLabel,
              hasError && colorClasses.accentRed
            )}
          >
            {label}
            {required && (
              <b className={clsx(colorClasses.accentRed, layoutClasses.ml05)}>
                *
              </b>
            )}
          </InputLabel>
        )}
        <Controller
          control={control}
          defaultValue={defaultValue}
          error={hasError}
          name={name}
          rules={validator}
          as={
            <Select
              name={name}
              labelId={label}
              value={selectedValue}
              displayEmpty
              disabled={disabled}
              multiple={multiple}
              renderValue={(selected) => {
                if (!multiple) {
                  if (selected) return getOption(selected as string)?.display;
                  return placeholder;
                }
                if (!selected) return [];
                if ((selected as string[]).length === 0) {
                  return placeholder;
                }
                return (selected as string[])
                  .map(getOption)
                  .map((option) => option?.display || "")
                  .join(", ");
              }}
              required={required}
              onOpen={() => setValue(name, value)}
              onChange={handleMUIChange}
              className={clsx(
                classes.select,
                isPlaceHolderOption && classes.placeholderSelect
              )}
            >
              {placeholder && (
                <MenuItem
                  value=""
                  disabled
                  className={clsx(classes.menuItem, classes.selectMenuItem)}
                >
                  {placeholder}
                </MenuItem>
              )}
              {options.map((option, i) => (
                <MenuItem
                  key={i}
                  value={option.code}
                  className={classes.menuItem}
                >
                  {option.display}
                </MenuItem>
              ))}
            </Select>
          }
        />
      </FormControl>
    </div>
  );
};

export default Dropdown;
