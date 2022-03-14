import cloneDeep from "lodash/cloneDeep";
import { FC, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { useNotification } from "src/hooks/useNotification";
import { Theme } from "src/theme/types/createPalette";
import { IProfileSetUpCardForm, TDropItem } from "src/types";

import { PROFILE_FIELD_GROUPS } from "./constants";
import ProfileSetUpForm from "./ProfileSetUpForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      position: "relative",
      padding: theme.spacing(4),
      overflow: "visible",
    },
  })
);

interface ProfileSetUpCardProps {
  payerOptions: TDropItem[];
  selectedTime: string;
  onSubmit: (form: IProfileSetUpCardForm) => void;
}

const ProfileSetUpCard: FC<ProfileSetUpCardProps> = ({
  payerOptions,
  selectedTime,
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
          <ProfileSetUpForm
            selectedTime={selectedTime}
            fieldGroups={updatedProfileFieldGroups}
          />
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProfileSetUpCard;
