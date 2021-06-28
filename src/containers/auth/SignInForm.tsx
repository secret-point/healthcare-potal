import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonWrapper: {
      marginTop: theme.spacing(3),
    },
    iconButton: {
      padding: theme.spacing(0),
    },
  })
);

const SignInForm = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleSubmit = () => {};

  const handleTogglePassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <FormProvider {...methods}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextInput
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Password"
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

        <Grid item xs={12} className={classes.buttonWrapper}>
          <Button
            text="SIGN IN"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default SignInForm;
