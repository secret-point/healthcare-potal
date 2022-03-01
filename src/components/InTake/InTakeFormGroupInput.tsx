import clsx from "clsx";
import { FC } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import FieldComponent from "src/components/FieldComponent";
import { FormGroup } from "src/types/form";

interface InTakeFormGroupInputProps {
  group: FormGroup;
}

const InTakeFormGroupInput: FC<InTakeFormGroupInputProps> = ({ group }) => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className={clsx(
          group.helperText ? layoutClasses.mb1 : layoutClasses.mb2
        )}
      >
        <Typography variant="h3" className={fontClasses.font500}>
          {group.groupName}
        </Typography>
      </Grid>

      {group.helperText && (
        <Grid item xs={12} className={layoutClasses.mb2}>
          <Typography variant="subtitle2">{group.helperText}</Typography>
        </Grid>
      )}

      <Grid container spacing={2}>
        {group.fields.map((field) => (
          <Grid key={field.path} item xs={field.xs} lg={field.lg}>
            <FieldComponent field={field} variant="outlined" />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default InTakeFormGroupInput;
