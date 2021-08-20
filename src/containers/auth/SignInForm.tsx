import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import TextInput from "../../components/TextInput";
import { Theme } from "../../theme/types/createPalette";
import { emailPattern } from "../../utils/string";
import { useInputDetails } from "../../hooks/useInputDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mt3: {
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
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const requiredFields = ["email", "password"];
  const { inputErrors, editedFields } = useInputDetails({
    fields: requiredFields,
  });

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={1}>
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
                message:
                  "Please enter your email address in the correct format.",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            placeholder="Password"
            validator={{ required: "Your password is required." }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    className={classes.iconButton}
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} className={classes.mt3}>
          <Button
            text="SIGN IN"
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
    </form>
  );
};

export default SignInForm;
