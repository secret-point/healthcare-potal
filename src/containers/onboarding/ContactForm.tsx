import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import TextInput from "../../components/TextInput";
import { emailPattern, phoneNumberPattern } from "../../utils/string";
import { Theme } from "../../theme/types/createPalette";

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

interface SignInFormProps {
  onNext: () => void;
}

const ContactForm: React.FC<SignInFormProps> = ({ onNext }) => {
  const classes = useStyles();

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const email = getValues("email");
  const phoneNumber = getValues("phoneNumber");
  const disabled =
    !email || !phoneNumber || Boolean(errors.email || errors.phoneNumber);
  const errorText = errors.email?.message || errors.phoneNumber?.message;

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
          disabled={disabled}
          onClick={onNext}
        />
      </Grid>

      {errorText && (
        <Grid item xs={12} className={classes.errorTextWrapper}>
          <ErrorText errorText={errorText} />
        </Grid>
      )}
    </Grid>
  );
};

export default ContactForm;
