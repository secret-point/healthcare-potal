import clsx from "clsx";
import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { TextButton } from "./Button";
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

interface MultiInstanceProps {
  label: string;
  path: string;
  limit?: number;
  required?: boolean;
  addButton?: string;
  instanceLabel?: string;
  variant?: "standard" | "outlined";
  properties: TCustomFieldProperty[];
  inputLabelClass?: string;
}

const MultiInstance: React.FC<MultiInstanceProps> = ({
  label,
  path,
  limit,
  required,
  variant,
  addButton,
  instanceLabel,
  properties,
  inputLabelClass,
}) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const [instances, setInstances] = useState<number[]>([0]);

  const handleClickAddMoreInstance = () => {
    setInstances([...instances, instances.length]);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormLabel
          htmlFor={path}
          className={clsx(classes.inputLabel, inputLabelClass)}
        >
          {label}
          {required && (
            <b className={clsx(colorClasses.accentRed, layoutClasses.ml05)}>
              *
            </b>
          )}
        </FormLabel>
      </Grid>

      <Grid container spacing={2}>
        {instances.map((index) => (
          <Grid key={index} item xs={12}>
            <Grid container spacing={2}>
              {instanceLabel && (
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {`${instanceLabel} ${index + 1}`}
                  </Typography>
                </Grid>
              )}
              {properties.map((property) => (
                <Grid
                  key={property.path}
                  item
                  xs={property.xs}
                  lg={property.lg}
                >
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

      {(!limit || instances.length < limit) && (
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
      )}
    </Grid>
  );
};

export default MultiInstance;
