import clsx from "clsx";
import { FC, useState, useEffect } from "react";
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
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const { getValues, register, setValue } = useFormContext();
  const value = getValues(name);

  const [muiValue, setMuiValue] = useState(value);

  const handleMUIChange = (event: any) => {
    const value = event.target.value;
    setMuiValue(value);
    setValue(name, value);
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    setMuiValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (!options.length) return <div />;

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        {label && (
          <FormLabel
            component="legend"
            className={clsx(isTopLabel && classes.topLabel)}
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
          onChange={handleMUIChange}
          name={name}
          value={muiValue || null}
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
                  control={<Radio color="secondary" />}
                  label={option.display}
                  className={clsx(
                    classes.formControlLabel,
                    option.code === muiValue && classes.selectedFormControlLabel
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioField;
