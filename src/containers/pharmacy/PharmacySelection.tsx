import { FC } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "src/components/Container";
import { useAuth } from "src/hooks/useAuth";
import { Theme } from "src/theme/types/createPalette";

import PrescriptionDelivery from "src/components/pharmacy/PrescriptionDelivery";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
  })
);

const PharmacySelection: FC = () => {
  const classes = useStyles();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Container className={classes.container}>
      <PrescriptionDelivery />
    </Container>
  );
};

export default PharmacySelection;
