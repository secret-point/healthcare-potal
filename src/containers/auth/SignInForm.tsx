import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { Nullable } from "../../types/general";
import { Theme } from "../../theme/types/createPalette";
import { validateEmail } from "../../utils/string";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mt3: {
      marginTop: theme.spacing(3),
    },
    iconButton: {
      padding: theme.spacing(0),
    },
    errorText: {
      color: theme.palette.accentRed.main,
    },
  })
);

const SignInForm = () => {
  const classes = useStyles();
  const [errorText, setErrorText] = useState<Nullable<string>>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    getValues,
    formState: { errors },
  } = useFormContext();
  const email = getValues("email");
  const password = getValues("password");
  const disabled = !email || !password || Boolean(Object.values(errors).length);

  const handleSubmit = () => {
    setErrorText(
      "Seems like the information you provided doesn’t match our records."
    );
  };

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="email"
          label="Email"
          variant="outlined"
          placeholder="Email"
          validator={{ required: true, validate: validateEmail }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
          validator={{ required: true }}
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

      {errorText && (
        <Grid item xs={12}>
          <Typography variant="body1" className={classes.errorText}>
            {errorText}
          </Typography>
        </Grid>
      )}

      <Grid item xs={12} className={classes.mt3}>
        <Button
          text="SIGN IN"
          color="primary"
          variant="contained"
          disabled={disabled}
          onClick={handleSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default SignInForm;
