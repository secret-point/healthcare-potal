import clsx from "clsx";
import dotProp from "dot-prop";
import React from "react";
import { useFormContext } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

interface StyleProps {
  hasError: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      transform: "translateY(-32px)",
    },
    inputLabel: {
      "&.MuiFormLabel-root": {
        fontSize: 16,
        color: (props: StyleProps) =>
          props.hasError
            ? theme.palette.accentRed.main
            : theme.palette.secondaryNavy2.main,
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
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = Boolean(dotProp.get(errors, path));

  const classes = useStyles({ hasError });
  const colorClasses = useColorStyles()();
  const layoutClasses = useLayoutStyles()();

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
                required,
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
