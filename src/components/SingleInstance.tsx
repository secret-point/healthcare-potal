import React from "react";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";

import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";

interface SingleInstanceProps {
  label: string;
  path: string;
  variant?: "standard" | "outlined";
  properties: TCustomFieldProperty[];
}

const SingleInstance: React.FC<SingleInstanceProps> = ({
  label,
  path,
  variant,
  properties,
}) => (
  <Grid container>
    <Grid item xs={12}>
      <InputLabel htmlFor={path}>{label}</InputLabel>
    </Grid>
    <Grid container spacing={2}>
      {properties.map((property) => (
        <Grid item xs={property.xs || 6}>
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

export default SingleInstance;
