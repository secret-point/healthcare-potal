import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";
import ErrorText from "src/components/ErrorText";
import TextInput from "src/components/TextInput";
import { emailPattern } from "src/utils/string";
import { Theme } from "src/theme/types/createPalette";
import { useInputDetails } from "src/hooks/useInputDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boldLabel: {
      "& label": {
        color: `${theme.palette.primaryNavy.main} !important`,
        fontSize: "14px !important",
        fontWeight: "700",
      },
    },
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
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextInput
          className={classes.boldLabel}
          name="email"
          label="Enter your Email"
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
