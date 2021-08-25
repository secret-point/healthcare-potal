import clsx from "clsx";
import React from "react";

import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      transform: "translateY(-32px)",
    },
    inputLabel: {
      "&.MuiFormLabel-root": {
        fontSize: 16,
        color: theme.palette.secondaryNavy2.main,
        height: 32,
        display: "flex",
        alignItems: "center",
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
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <FormLabel htmlFor={path} className={classes.inputLabel}>
          {label}
          {required && (
            <b className={clsx(colorClasses.accentRed, layoutClasses.ml05)}>
              *
            </b>
          )}
        </FormLabel>
      </Grid>
      <Grid container spacing={2}>
        {properties.map((property) => (
          <Grid key={property.path} item xs={property.xs} lg={property.lg}>
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
