import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import TextInput from "../../components/TextInput";
import { emailPattern, phoneNumberPattern } from "../../utils/string";
import { Theme } from "../../theme/types/createPalette";
import { useInputDetails } from "../../hooks/useInputDetails";

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

interface ContactFormProps {
  onNext: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onNext }) => {
  const classes = useStyles();

  const requiredFields = ["email", "phoneNumber"];
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
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          placeholder="Phone Number"
          validator={{
            required: "Your phone number is required.",
            pattern: {
              value: phoneNumberPattern,
              message:
                "Please enter your phone number in the correct format (numbers only).",
            },
          }}
        />
      </Grid>

      <Grid item xs={12} className={classes.buttonWrapper}>
        <Button
          text="NEXT"
          color="primary"
          variant="contained"
          disabled={
            Boolean(inputErrors.length) ||
            editedFields.length !== requiredFields.length
          }
          onClick={onNext}
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
