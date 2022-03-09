import cloneDeep from "lodash/cloneDeep";
import { FC, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button from "src/components/Button";
import CheckboxField from "src/components/CheckboxField";
import InTakeFormGroupInput from "src/components/InTake/InTakeFormGroupInput";
import { useNotification } from "src/hooks/useNotification";
import { Theme } from "src/theme/types/createPalette";
import { IProfileSetUpCardForm, TDropItem } from "src/types";

import { PROFILE_FIELD_GROUPS } from "./constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      padding: theme.spacing(4),
      overflow: "visible",
    },

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

    appointmentButton: {
      background: `${theme.palette.secondaryGreen1.main} !important`,
      borderRadius: theme.spacing(1),
      textTransform: "none",
      padding: theme.spacing(1.5, 2),

      "& .MuiTypography-root": {
        color: "white !important",
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

interface ProfileSetUpCardProps {
  payerOptions: TDropItem[];
  onSubmit: (form: IProfileSetUpCardForm) => void;
}

const ProfileSetUpCard: FC<ProfileSetUpCardProps> = ({
  payerOptions,
  onSubmit,
}) => {
  const classes = useStyles();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const updatedProfileFieldGroups = useMemo(() => {
    const profileFieldGroups = cloneDeep(PROFILE_FIELD_GROUPS);
    profileFieldGroups[2].fields[0].options = payerOptions;
    return profileFieldGroups;
  }, [payerOptions]);

  const stripe = useStripe();
  const elements = useElements();
  const { handleError } = useNotification();

  const handleSubmit = async () => {
    const values: any = methods.getValues();
    if (!values.policy) {
      handleError(null, "Please agree with our policy.");
      return;
    }

    if (!values.updates) {
      handleError(null, "Please agree to get the updates.");
      return;
    }

    if (!elements || !stripe) {
      handleError(null, "There was an error while processing stripe.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      handleError(null, "Please fill out the payment details.");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      card,
      type: "card",
    });

    if (error || !paymentMethod) {
      handleError(
        error,
        `There was an error while processing the payment method. ${error?.code}`
      );
      return;
    }

    const paymentId = paymentMethod.id;
    onSubmit({ ...values, paymentId } as IProfileSetUpCardForm);
  };

  return (
    <Card className={classes.card}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Grid container spacing={2}>
            {updatedProfileFieldGroups.map((group) => (
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

          <Grid item xs={12} className={classes.appointmentButtonWrapper}>
            <Button
              text="Book an appointment"
              fullWidth
              className={classes.appointmentButton}
              type="submit"
            />
          </Grid>
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProfileSetUpCard;
