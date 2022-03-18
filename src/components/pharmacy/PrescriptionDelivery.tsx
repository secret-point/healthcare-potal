import { FC, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "src/components/Button";
import DeliveryCard from "src/components/pharmacy/DeliveryCard";
import { useLayoutStyles } from "src/components/useCommonStyles";
// import { Theme } from "src/theme/types/createPalette";
import { PRESCRIPTION_DELIVERY_OPTIONS } from "src/types";

import { ReactComponent as HomeDeliveryIcon } from "src/icons/HomeDelivery.svg";
import { ReactComponent as PharmacyPickupIcon } from "src/icons/PharmacyPickup.svg";

const HomeDeliveryInstructions = [
  "Flat fee of $15 per medication, per month.",
  "Usually arrives within 3 days of appointment, delivered in discreet packaging.",
];

const PharmacyPickupInstructions = [
  "Copay varies based on your insurance coverage.",
  "Usually available for pickup within 1~2 days of appointment.",
];

const deliveryOptions = [
  {
    icon: <PharmacyPickupIcon />,
    isRecommended: true,
    instructions: HomeDeliveryInstructions,
    option: PRESCRIPTION_DELIVERY_OPTIONS.HOME_DELIVERY,
    title: "Home Delivery",
  },
  {
    icon: <HomeDeliveryIcon />,
    isRecommended: false,
    instructions: PharmacyPickupInstructions,
    option: PRESCRIPTION_DELIVERY_OPTIONS.PHARMACY_PICKUP,
    title: "Pharmacy Pickup",
  },
];

// const useStyles = makeStyles((theme: Theme) => createStyles({}));

const PrescriptionDelivery: FC = () => {
  // const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  const [selectedOption, setSelectedOption] =
    useState<Nullable<PRESCRIPTION_DELIVERY_OPTIONS>>(null);

  const handleSelectOption = (option: PRESCRIPTION_DELIVERY_OPTIONS) => {
    setSelectedOption(option);
  };

  return (
    <Grid container item xl={6} lg={8} md={10}>
      <Grid item xs={12} className={layoutClasses.mb4}>
        <Typography variant="h3">
          How do you want to receive your prescription?
        </Typography>
      </Grid>

      {deliveryOptions.map((deliveryOption) => (
        <Grid
          key={deliveryOption.option}
          item
          xs={12}
          className={layoutClasses.mb3}
        >
          <DeliveryCard
            {...deliveryOption}
            isSelected={selectedOption === deliveryOption.option}
            onSelect={handleSelectOption}
          />
        </Grid>
      ))}

      <Grid container justify="center" className={layoutClasses.mt3}>
        <Grid item xs={6}>
          <Button
            text="NEXT"
            color="primary"
            type="submit"
            variant="contained"
            disabled={!selectedOption}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PrescriptionDelivery;
