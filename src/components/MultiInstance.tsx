import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { TextButton } from "./Button";

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

interface MultiInstanceProps {
  label: string;
  path: string;
  addButton?: string;
  variant?: "standard" | "outlined";
  properties: TCustomFieldProperty[];
}

const MultiInstance: React.FC<MultiInstanceProps> = ({
  addButton,
  label,
  path,
  variant,
  properties,
}) => {
  const classes = useStyles();
  const [instances, setInstances] = useState<number[]>([0]);

  const handleClickAddMoreInstance = () => {
    setInstances([...instances, instances.length]);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <InputLabel htmlFor={path} className={classes.inputLabel}>
          {label}
        </InputLabel>
      </Grid>

      <Grid container spacing={2}>
        {instances.map((index) => (
          <Grid key={index} item xs={12}>
            <Grid container spacing={2}>
              {properties.map((property) => (
                <Grid key={property.path} item xs={property.xs || 6}>
                  <FieldComponent
                    key={property.path}
                    field={{
                      ...property,
                      label: "",
                      path: [`[${index}]`, path, property.path].join("."),
                    }}
                    variant={variant}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>

      <Grid container justify="flex-end">
        <TextButton title={addButton} onClick={handleClickAddMoreInstance} />
      </Grid>
    </Grid>
  );
};

export default MultiInstance;
