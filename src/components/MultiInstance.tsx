import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { TextButton } from "./Button";
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

interface MultiInstanceProps {
  label: string;
  path: string;
  required?: boolean;
  addButton?: string;
  variant?: "standard" | "outlined";
  properties: TCustomFieldProperty[];
}

const MultiInstance: React.FC<MultiInstanceProps> = ({
  label,
  path,
  required,
  variant,
  addButton,
  properties,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const [instances, setInstances] = useState<number[]>([0]);

  const handleClickAddMoreInstance = () => {
    setInstances([...instances, instances.length]);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <InputLabel htmlFor={path} className={classes.inputLabel}>
          {label}
          {required && <b className={colorClasses.accentRed}>*</b>}
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
        <TextButton
          text={
            <Box display="flex" alignItems="center">
              <AddCircleOutlineIcon />
              &nbsp;
              {addButton}
            </Box>
          }
          onClick={handleClickAddMoreInstance}
        />
      </Grid>
    </Grid>
  );
};

export default MultiInstance;
