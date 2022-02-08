import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";
import ErrorText from "src/components/ErrorText";
import TextInput from "src/components/TextInput";
import { emailPattern, phoneNumberPattern } from "src/utils/string";
import { Theme } from "src/theme/types/createPalette";
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

const ContactForm = () => {
  const classes = useStyles();

  const requiredFields = ["email", "phone"];
  const { inputErrors, editedFields } = useInputDetails({
    fields: requiredFields,
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          validator={{
            required: "Your email address is required.",
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
        <TextInput
          name="phone"
          label="Phone Number"
          variant="outlined"
          placeholder="Phone Number"
          validator={{
            required: "Your phone number is required.",
            pattern: {
              value: phoneNumberPattern,
              message:
                "Please enter a 10 digit number without any special characters.",
            },
          }}
        />
      </Grid>

      <Grid item xs={12} className={classes.buttonWrapper}>
        <Button
          text="NEXT"
          type="submit"
          color="primary"
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

export default ContactForm;
