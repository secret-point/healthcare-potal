import clsx from "clsx";
import dotProp from "dot-prop";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid, { GridSize } from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TDropItem } from "../types";
import { Theme } from "../theme/types/createPalette";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropdown: {
      position: "relative",
    },
    formControl: {
      minWidth: "100%",
    },
    formControlLabel: {
      width: "100%",
      margin: theme.spacing(0),
      padding: theme.spacing(3, 2),
      borderRadius: theme.spacing(1),
      border: `1px solid rgba(0, 0, 0, 0.23)`,
      "& > span": {
        padding: theme.spacing(0, 2, 0, 0),
        fontSize: 18,
        "&:last-child": {
          color: theme.palette.primaryNavy.main,
        },
      },
    },
    selectedFormControlLabel: {
      "& .MuiFormControlLabel-label": {
        color: theme.palette.secondaryGreen1.main,
      },
      border: `1px solid ${theme.palette.secondaryGreen1.main}`,
      "& span:last-child": {
        color: theme.palette.secondaryGreen1.main,
      },
    },
    topLabel: {
      fontSize: 16,
      marginBottom: theme.spacing(0.5),
    },
  })
);

type RadioFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  isTopLabel?: boolean;
  options: TDropItem[];
  validator?: any;
  layout: {
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
  };
  onChange?: (name: string, value: string) => void;
  onClick?: VoidFunction;
};

const RadioField: FC<RadioFieldProps> = ({
  label,
  name,
  required,
  isTopLabel,
  options,
  layout,
  validator,
  onChange,
  onClick,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const {
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const value = getValues(name);
  const [muiValue, setMuiValue] = useState(value);

  const handleMUIChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMuiValue(value);
    setValue(name, value);
    onChange?.(name, value);
  };

  useEffect(() => {
    register(name, validator);
  }, [register, name, validator]);

  useEffect(() => {
    setMuiValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const hasError = Boolean(dotProp.get(errors, name));

  return (
    <FormControl className={classes.formControl}>
      {label && (
        <FormLabel
          component="legend"
          className={clsx(
            isTopLabel && classes.topLabel,
            hasError && colorClasses.accentRed
          )}
        >
          {label}
          {required && (
            <b className={clsx(colorClasses.accentRed, layoutClasses.ml05)}>
              *
            </b>
          )}
        </FormLabel>
      )}
      <RadioGroup
        aria-label={name}
        name={name}
        value={muiValue || null}
        onChange={handleMUIChange}
      >
        <Grid container spacing={3}>
          {options.map((option) => (
            <Grid
              item
              key={option.code}
              xs={layout.xs}
              sm={layout.sm}
              md={layout.md}
              lg={layout.lg}
            >
              <FormControlLabel
                value={option.code}
                control={<Radio color="secondary" onClick={onClick} />}
                label={option.display}
                className={clsx(
                  classes.formControlLabel,
                  option.code === value && classes.selectedFormControlLabel
                )}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
};

export default RadioField;
