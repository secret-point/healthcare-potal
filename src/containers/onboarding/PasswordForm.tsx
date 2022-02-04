import dotProp from "dot-prop";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import Button from "src/components/Button";
import TextInput from "src/components/TextInput";
import PasswordUpdateResult from "src/components/PasswordUpdateResult";
import { useLayoutStyles } from "src/components/useCommonStyles";

const PasswordForm = () => {
  const layoutClasses = useLayoutStyles();

  const { getValues, watch } = useFormContext();
  const values = getValues();
  const password = dotProp.get(values, "password") as string;
  const confirmPassword = dotProp.get(values, "confirmPassword") as string;

  const showResult = Boolean(password || confirmPassword);
  const shouldPasswordMatch =
    Boolean(password) &&
    Boolean(confirmPassword) &&
    password === confirmPassword;
  const shouldLongerThan8 = Boolean(password) && password.length >= 8;

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

      <Grid item xs={12}>
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
        <PasswordUpdateResult
          shouldLongerThan8={shouldLongerThan8}
          shouldPasswordMatch={shouldPasswordMatch}
        />
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
