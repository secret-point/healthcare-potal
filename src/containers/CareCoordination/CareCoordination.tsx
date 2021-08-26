import { useForm, FormProvider } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { FieldType } from "../../types/general";
import { CARE_PROVIDER_TYPES } from "../../constants/identity";
import { usStates } from "../../constants/usStates";
import Container from "../../components/Container";
import { useLayoutStyles } from "../../components/useCommonStyles";
import MultiInstance from "../../components/MultiInstance";

const PROVIDER = {
  label: "Who would you like us to coordinate your care with?",
  type: FieldType.MULTI_INSTANCE,
  path: "pharmacyInformation",
  properties: [
    {
      path: "provider",
      placeholder: "Select type of provider",
      type: FieldType.SELECT,
      options: CARE_PROVIDER_TYPES,
      xs: 6,
    },
    {
      path: "name",
      placeholder: "Name of the person",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "streetAddress1",
      placeholder: "Street address 1",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "streetAddress2",
      placeholder: "Street address 2(optional)",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "city",
      placeholder: "City",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "zipcode",
      placeholder: "Zipcode",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "state",
      placeholder: "Zipcode",
      type: FieldType.SELECT,
      options: usStates,
      xs: 6,
    },
    {
      path: "phoneNumber",
      placeholder: "Phone number",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "faxNumber",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      placeholder: "Fax number(if available)",
      xs: 6,
    },
    {
      path: "emailAddress",
      placeholder: "Email address(if available)",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
  ],
  addButton: "Add another provider",
  required: true,
};

const CareCoordination = () => {
  const layoutClasses = useLayoutStyles();
  const methods = useForm({
    mode: "onBlur",
  });

  return (
    <Container>
      <Grid container>
        <FormProvider {...methods}>
          <Grid item xs={12}>
            <Typography variant="h3">Coordination of Care</Typography>
          </Grid>
          <Grid item xs={12} className={layoutClasses.mt1}>
            <Typography variant="subtitle1">
              Coordination of Care allows for your Prairie team to provide
              updates on your care with an outside provider like a therapist or
              your primary care provider. This leads to better outcomes on
              average, since everyone has the latest information about your care
              from your psychiatrist here at Prairie Health.
            </Typography>
            <Typography variant="subtitle1" className={layoutClasses.mt2}>
              Your care team at Prairie Health will share relevant medical
              information with the people with whom you&apos;d like us to
              coordinate care via mail, fax or any other secure methods.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MultiInstance
              label={PROVIDER.label}
              path=""
              properties={PROVIDER.properties}
              variant="outlined"
              addButton="Add another provider"
            />
          </Grid>
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default CareCoordination;
