import cloneDeep from "lodash/cloneDeep";
import { FC, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { Theme } from "src/theme/types/createPalette";
import InTakeFormGroupInput from "src/components/InTake/InTakeFormGroupInput";
import { TDropItem } from "src/types";

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
  })
);

interface ProfileSetUpCardProps {
  payerOptions: TDropItem[];
}

const ProfileSetUpCard: FC<ProfileSetUpCardProps> = ({ payerOptions }) => {
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

  const handleSubmit = async () => {
    if (!elements || !stripe) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      card,
      type: "card",
    });

    console.log(error, paymentMethod);
  };

  return (
    <Card className={classes.card}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {updatedProfileFieldGroups.map((group) => (
              <Grid key={group.groupName} item xs={12}>
                <InTakeFormGroupInput group={group} />
              </Grid>
            ))}
          </Grid>

          <CardElement />
        </form>
      </FormProvider>
    </Card>
  );
};

export default ProfileSetUpCard;
