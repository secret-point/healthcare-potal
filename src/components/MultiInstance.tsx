import clsx from "clsx";
import dotProp from "dot-prop";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { Theme } from "../theme/types/createPalette";
import { TCustomFieldProperty } from "../types";
import FieldComponent from "./FieldComponent";
import { TextButton } from "./Button";
import { useColorStyles, useLayoutStyles } from "./useCommonStyles";

interface StyleProps {
  hasError: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputLabel: {
      "&.MuiFormLabel-root": {
        fontSize: 16,
        color: (props: StyleProps) =>
          props.hasError
            ? theme.palette.accentRed.main
            : theme.palette.secondaryNavy1.main,
        height: 32,
        display: "flex",
        alignItems: "center",
      },
    },
    redAlertButton: {
      "& .MuiTypography-root": {
        color: theme.palette.accentRed.main,
      },

      "&:hover": {
        "& .MuiTypography-root": {
          color: theme.palette.accentRed2.main,
        },
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
  deleteButton?: string;
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
  deleteButton,
  instanceLabel,
  properties,
  inputLabelClass,
}) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(path);
  const hasError = Boolean(dotProp.get(errors, path));

  const classes = useStyles({ hasError });
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const [instances, setInstances] = useState<number[]>([0]);

  useEffect(() => {
    if (!value) return;
    setInstances(
      new Array(value.length || 1).fill(0).map((_value, index) => index)
    );
    // eslint-disable-next-line
  }, [path]);

  const handleClickAddMoreInstance = () => {
    setInstances([...instances, instances.length]);
  };

  const handleClickDelete = () => {
    setInstances(instances.slice(0, instances.length - 1));
  };

  const renderInstance = (index: number) => (
    <Grid key={index} item xs={12}>
      <Grid container spacing={3}>
        {instanceLabel && (
          <Grid item xs={12}>
            <Typography variant="h5">
              {`${instanceLabel} ${index + 1}`}
            </Typography>
          </Grid>
        )}
        {properties.map((property) => (
          <Grid key={property.path} item xs={property.xs} lg={property.lg}>
            <FieldComponent
              key={property.path}
              field={{
                ...property,
                required,
                label: "",
                path: [path, index, property.path].join("."),
              }}
              variant={variant}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );

  const shouldShowDeleteButton = deleteButton && instances.length >= 2;
  const shouldShowAddButton = !limit || instances.length < limit;

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

      <Grid container spacing={3}>
        {instances.map((index) => renderInstance(index))}
      </Grid>

      {(shouldShowDeleteButton || shouldShowAddButton) && (
        <Grid
          container
          className={clsx(layoutClasses.mt1, layoutClasses.gap3)}
          justify="flex-end"
        >
          {shouldShowAddButton && (
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
          )}

          {shouldShowDeleteButton && (
            <TextButton
              className={classes.redAlertButton}
              text={
                <Box display="flex" alignItems="center">
                  <RemoveCircleOutlineIcon />
                  &nbsp;
                  {deleteButton}
                </Box>
              }
              onClick={handleClickDelete}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default MultiInstance;
