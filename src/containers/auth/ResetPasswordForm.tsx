import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import TextInput from "../../components/TextInput";
import { emailPattern } from "../../utils/string";
import { Theme } from "../../theme/types/createPalette";
import { useInputDetails } from "../../hooks/useInputDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    errorTextWrapper: {
      marginTop: theme.spacing(1.5),
    },
  })
);

const ResetPasswordForm = () => {
  const classes = useStyles();

  const requiredFields = ["email"];
  const { inputErrors, editedFields } = useInputDetails({
    fields: requiredFields,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextInput
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          validator={{
            required: "Your email is required.",
            pattern: {
              value: emailPattern,
              message: "Please enter your email address in the correct format.",
            },
          }}
          InputProps={{
            inputProps: {
              style: { textTransform: "lowercase" },
            },
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          text="RESET PASSWORD"
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

export default ResetPasswordForm;
