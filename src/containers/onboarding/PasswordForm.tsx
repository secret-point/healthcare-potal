import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import TextInput from "../../components/TextInput";
import GreenCheckIcon from "../../icons/GreenCheckIcon";
import RedCrossIcon from "../../icons/RedCrossIcon";

const useStyles = makeStyles((theme) =>
  createStyles({
    mt3: {
      marginTop: theme.spacing(3),
    },
    iconButton: {
      padding: theme.spacing(0),
    },
    mt2: {
      marginTop: theme.spacing(2),
    },
    ml2: {
      marginLeft: theme.spacing(2),
    },
  })
);

interface PasswordFormProps {
  onNext: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onNext }) => {
  const classes = useStyles();

  const {
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const password = getValues("password");
  const confirmPassword = getValues("confirm");

  const showResult = Boolean(password || confirmPassword);
  const doesPasswordMatch =
    password && confirmPassword && errors.confirm?.type !== "validate";
  const shouldLongerThan8 = password && errors.password?.type !== "minLength";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextInput
          name="password"
          label="Password"
          variant="outlined"
          placeholder="Password"
          validator={{
            required: true,
            minLength: 8,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <TextInput
          name="confirm"
          label="Confirm Password"
          variant="outlined"
          placeholder="Confirm Password"
          validator={{
            required: true,
            validate: (value: string) => value === watch("password"),
          }}
        />
      </Grid>

      {showResult && (
        <Grid item xs={12} className={classes.mt2}>
          <Grid container item xs={12} alignItems="center">
            {doesPasswordMatch ? <GreenCheckIcon /> : <RedCrossIcon />}
            <Typography className={classes.ml2}>Password matches</Typography>
          </Grid>
          <Grid container item xs={12} alignItems="center">
            {shouldLongerThan8 ? <GreenCheckIcon /> : <RedCrossIcon />}
            <Typography className={classes.ml2}>
              Minimum of 8 characters
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} className={classes.mt3}>
        <Button
          text="NEXT"
          color="primary"
          variant="contained"
          disabled={!doesPasswordMatch || !shouldLongerThan8}
          onClick={onNext}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordForm;
