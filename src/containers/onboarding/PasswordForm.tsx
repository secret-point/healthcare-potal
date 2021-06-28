import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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

interface PasswordFormProps {
  onNext: () => void;
}

const ContactForm: React.FC<PasswordFormProps> = ({ onNext }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="confirm"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
        />
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

export default ContactForm;
