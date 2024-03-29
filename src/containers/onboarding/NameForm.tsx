import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";
import TextInput from "src/components/TextInput";
import { Theme } from "src/theme/types/createPalette";
import ErrorText from "src/components/ErrorText";
import { useInputDetails } from "src/hooks/useInputDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      marginTop: theme.spacing(3),
    },
    iconButton: {
      padding: theme.spacing(0),
    },
    errorTextWrapper: {
      marginTop: theme.spacing(1.5),
    },
  })
);

const NameInputForm = () => {
  const classes = useStyles();

  const requiredFields = ["firstName", "lastName"];
  const { inputErrors, editedFields } = useInputDetails({
    fields: requiredFields,
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="firstName"
          label="First Name"
          variant="outlined"
          placeholder="First Name"
          validator={{ required: "Your first name is required." }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="lastName"
          label="Last Name"
          variant="outlined"
          placeholder="Last Name"
          validator={{ required: "Your last name is required." }}
        />
      </Grid>

      <Grid item xs={12} className={classes.buttonWrapper}>
        <Button
          text="NEXT"
          color="primary"
          type="submit"
          variant="contained"
          disabled={
            Boolean(inputErrors.length) ||
            editedFields.length !== requiredFields.length
          }
        />
      </Grid>

      {Boolean(inputErrors.length) && (
        <Grid item xs={12} className={classes.errorTextWrapper}>
          {inputErrors.map((errorText, index) => (
            <ErrorText key={index} errorText={errorText} />
          ))}
        </Grid>
      )}
    </Grid>
  );
};

export default NameInputForm;
