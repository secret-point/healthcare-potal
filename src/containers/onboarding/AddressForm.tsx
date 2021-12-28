import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import ErrorText from "../../components/ErrorText";
import Dropdown from "../../components/Dropdown";
import TextInput from "../../components/TextInput";
import { Theme } from "../../theme/types/createPalette";
import { useInputDetails } from "../../hooks/useInputDetails";
import { usStates } from "../../constants/usStates";
import { usZipcodePattern } from "../../utils/string";

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

const AddressForm = () => {
  const classes = useStyles();

  const requiredFields = ["addressLine1", "city", "state", "zipcode"];
  const { inputErrors, editedFields } = useInputDetails({
    fields: requiredFields,
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="addressLine1"
          label="Address Line 1"
          variant="outlined"
          placeholder="Address Line 1"
          validator={{ required: "Your address is required." }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="addressLine2"
          label="Address Line 2"
          variant="outlined"
          placeholder="Address Line 2"
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="city"
          label="City"
          variant="outlined"
          placeholder="City"
          validator={{ required: "Your city is required." }}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Dropdown
              name="state"
              label="State"
              variant="outlined"
              placeholder="State"
              options={usStates}
              validator={{ required: "Your state is required." }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="zipcode"
              label="Zip Code"
              variant="outlined"
              placeholder="Zip Code"
              validator={{
                required: "Your zip code is required.",
                pattern: {
                  value: usZipcodePattern,
                  message: "Please enter a 5 digit number zip code.",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.buttonWrapper}>
        <Button
          text="NEXT"
          color="primary"
          type="submit"
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
  );
};

export default AddressForm;
