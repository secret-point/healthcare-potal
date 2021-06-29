import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
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

interface AddressFormProps {
  onNext: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onNext }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="addressLine1"
          label="Address Line 1"
          variant="outlined"
          placeholder="Address Line 1"
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
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextInput
              name="state"
              label="State"
              variant="outlined"
              placeholder="State"
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="zipcode"
              label="Zip Code"
              variant="outlined"
              placeholder="Zip Code"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} className={classes.buttonWrapper}>
        <Button
          text="NEXT"
          color="primary"
          variant="contained"
          onClick={onNext}
        />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
