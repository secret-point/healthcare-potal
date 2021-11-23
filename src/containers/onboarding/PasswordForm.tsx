import dotProp from "dot-prop";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import { ReactComponent as GreenCheckIcon } from "../../icons/GreenCheckIcon.svg";
import { ReactComponent as RedCrossIcon } from "../../icons/RedCrossIcon.svg";
import { useLayoutStyles } from "../../components/useCommonStyles";

const PasswordForm = () => {
  const layoutClasses = useLayoutStyles();

  const { getValues, watch } = useFormContext();
  const values = getValues();
  const password = dotProp.get(values, "password") as string;
  const confirmPassword = dotProp.get(values, "confirmPassword") as string;

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
          type="password"
          validator={{
            required: true,
            minLength: 8,
          }}
        />
      </Grid>

      <Grid item xs={12} className={layoutClasses.mt3}>
        <TextInput
          name="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          type="password"
          validator={{
            required: true,
            validate: (value: string) => value === watch("password"),
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
