import React from "react";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { useColorStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      transform: "translateY(-16px)",
    },
    inputLabel: {
      "&.MuiInputLabel-root": {
        fontSize: 16,
        color: theme.palette.secondaryNavy2.main,
        transform: "translateY(-8px)",
      },
    },
  })
);

interface SingleInstanceProps {
  label: string;
  path: string;
  required?: boolean;
  variant?: "standard" | "outlined";
  properties: TCustomFieldProperty[];
}

const SingleInstance: React.FC<SingleInstanceProps> = ({
  label,
  path,
  required,
  variant,
  properties,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <InputLabel htmlFor={path} className={classes.inputLabel}>
          {label}
          {required && <b className={colorClasses.accentRed}>*</b>}
        </InputLabel>
      </Grid>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid key={property.path} item xs={property.xs || 6}>
            <FieldComponent
              key={property.path}
              field={{
                ...property,
                label: "",
                path: [path, property.path].join("."),
              }}
              variant={variant}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SingleInstance;
