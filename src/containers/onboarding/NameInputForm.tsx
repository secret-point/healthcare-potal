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

interface SignInFormProps {
  onNext: () => void;
}

const NameInputForm: React.FC<SignInFormProps> = ({ onNext }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="firstName"
          label="First Name"
          variant="outlined"
          placeholder="First Name"
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="lastName"
          label="Last Name"
          variant="outlined"
          placeholder="Last Name"
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

export default NameInputForm;
