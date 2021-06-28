import { useForm, FormProvider } from "react-hook-form";
import Grid from "@material-ui/core/Grid";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

const ResetForm = () => {
  const methods = useForm({
    mode: "onBlur",
  });

  const handleResetPassword = () => {};

  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            name="email"
            label="Email"
            variant="outlined"
            placeholder="Email"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            text="RESET PASSWORD"
            color="primary"
            variant="contained"
            onClick={handleResetPassword}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ResetForm;
