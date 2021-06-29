import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { Theme } from "../../theme/types/createPalette";
import ErrorText from "../../components/ErrorText";

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

const NameInputForm: React.FC<SignInFormProps> = ({ onNext }) => {
  const classes = useStyles();

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const firstName = getValues("firstName");
  const lastName = getValues("lastName");
  const disabled =
    !firstName || !lastName || Boolean(errors.firstName || errors.lastName);
  const errorText = errors.firstName?.message || errors.lastName?.message;

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

export default NameInputForm;
