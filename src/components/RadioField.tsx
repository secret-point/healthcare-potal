import clsx from "clsx";
import dotProp from "dot-prop";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
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
    root: {},
    dropdown: {
      position: "relative",
    },
    formControl: {
      minWidth: "100%",
    },
    formControlLabel: {
      width: "100%",
      margin: theme.spacing(0),
      padding: theme.spacing(1),
      borderRadius: theme.spacing(1),
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
    },
    selectedFormControlLabel: {
      "& .MuiFormControlLabel-label": {
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
};

const RadioField: FC<RadioFieldProps> = ({
  label,
  name,
  required,
  isTopLabel,
  options,
  layout,
  validator,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const {
    control,
    getValues,
    register,
    formState: { errors },
  } = useFormContext();

  const value = getValues(name);
  const hasError = Boolean(dotProp.get(errors, name));

  return (
    <div className={classes.root}>
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
        <Controller
          name={name}
          control={control}
          as={
            <RadioGroup aria-label={name} value={value}>
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
                      control={<Radio color="secondary" />}
                      label={option.display}
                      className={clsx(
                        classes.formControlLabel,
                        option.code === value &&
                          classes.selectedFormControlLabel
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          }
          {...register(name, validator)}
        />
      </FormControl>
    </div>
  );
};

export default RadioField;
