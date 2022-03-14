import clsx from "clsx";
import _ from "lodash";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { PrimaryButton } from "src/components/Button";
import CheckboxField from "src/components/CheckboxField";
import InTakeFormGroupInput from "src/components/InTake/InTakeFormGroupInput";
import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";
import { IFormGroup } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profileAvatar: {
      position: "absolute",
      right: theme.spacing(4),
      top: theme.spacing(-7.5),
    },

    divider: {
      color: theme.palette.distinctiveGray.main,
      margin: theme.spacing(2.5, 0),
    },

    appointmentButtonWrapper: {
      padding: theme.spacing(2, 4, 2),
      position: "absolute",
      left: 0,
      right: 0,
      bottom: theme.spacing(-10),
    },

    mobileAppointmentButtonWrapper: {
      paddingTop: theme.spacing(2),
    },

    appointmentButton: {
      background: `${theme.palette.secondaryGreen1.main} !important`,
      borderRadius: theme.spacing(1),
      textTransform: "none",
      padding: theme.spacing(1.5, 2),

      "& .MuiTypography-root": {
        color: "white !important",
        letterSpacing: "inherit",
      },
    },

    checkboxField: {
      border: "none",
    },

    highlightSpan: {
      color: `${theme.palette.secondaryGreen1.main} !important`,
    },
  })
);

interface ProfileSetUpFormProps {
  fieldGroups: IFormGroup[];
  selectedTime: string;
}

const ProfileSetUpForm: FC<ProfileSetUpFormProps> = ({
  fieldGroups,
  selectedTime,
}) => {
  const classes = useStyles();

  const { isMobile } = useViewport();

  const {
    formState: { isDirty },
    getValues,
  } = useFormContext();

  const values = getValues();

  const hasErrors = fieldGroups.some((fieldGroup) => {
    return fieldGroup.fields.some((field) => {
      return (
        field.required &&
        !_.get(values, field.path) &&
        field.path !== "stripeToken"
      );
    });
  });

  const isDisabled =
    !isDirty || hasErrors || !values.updates || !values.policy || !selectedTime;

  return (
    <>
      <Grid container spacing={2}>
        {fieldGroups.map((group) => (
          <Grid key={group.groupName} item xs={12}>
            <InTakeFormGroupInput group={group} />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <Divider className={classes.divider} />
      </Grid>

      <Grid item xs={12}>
        <CheckboxField
          name="policy"
          label={
            /* eslint-disable */
            <>
              I have read and understood the&nbsp;
              <span className={classes.highlightSpan}>
                Terms of Service, Privacy Policy
              </span>
              , and&nbsp;
              <span className={classes.highlightSpan}>
                Notice of Privacy Practices
              </span>
              &nbsp; and consent to receiving care via telehealth.
            </>
          }
          required
          className={classes.checkboxField}
        />

        <CheckboxField
          name="updates"
          label="I agree to receive any updates about my care via text message notwithstanding the privacy risk of using text message."
          required
          className={classes.checkboxField}
        />
      </Grid>

      <Grid
        item
        xs={12}
        className={clsx({
          [classes.appointmentButtonWrapper]: !isMobile,
          [classes.mobileAppointmentButtonWrapper]: isMobile,
        })}
      >
        <PrimaryButton
          disabled={isDisabled}
          text="Book an appointment"
          fullWidth
          type="submit"
        />
      </Grid>
    </>
  );
};

export default ProfileSetUpForm;
