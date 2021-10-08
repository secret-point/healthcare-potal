import { useState } from "react";
import dotProp from "dot-prop";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import GreenCheckIcon from "../../icons/GreenCheckIcon";
import RedCrossIcon from "../../icons/RedCrossIcon";
import { useLayoutStyles } from "../../components/useCommonStyles";

const PasswordForm = () => {
  const layoutClasses = useLayoutStyles()();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { getValues, watch } = useFormContext();
  const values = getValues();
  const password = dotProp.get(values, "password") as string;
  const confirmPassword = dotProp.get(values, "confirmPassword") as string;

  const handleTogglePassword = () => setShowPassword((show) => !show);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const showResult = Boolean(password || confirmPassword);
  const shouldPasswordMatch =
    password && confirmPassword && password === confirmPassword;
  const shouldLongerThan8 = password && password.length >= 8;

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          validator={{
            required: true,
            minLength: 8,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  className={layoutClasses.noPadding}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} className={layoutClasses.mt3}>
        <TextInput
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          validator={{
            required: true,
            validate: (value: string) => value === watch("password"),
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirm password visibility"
                  className={layoutClasses.noPadding}
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {showResult && (
        <Grid item xs={12} className={layoutClasses.mt2}>
          <Grid container item xs={12} alignItems="center">
            {shouldPasswordMatch ? <GreenCheckIcon /> : <RedCrossIcon />}
            <Typography className={layoutClasses.ml2}>
              Password matches
            </Typography>
          </Grid>
          <Grid container item xs={12} alignItems="center">
            {shouldLongerThan8 ? <GreenCheckIcon /> : <RedCrossIcon />}
            <Typography className={layoutClasses.ml2}>
              Minimum of 8 characters
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} className={layoutClasses.mt3}>
        <Button
          text="NEXT"
          color="primary"
          type="submit"
          variant="contained"
          disabled={!shouldPasswordMatch || !shouldLongerThan8}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordForm;
