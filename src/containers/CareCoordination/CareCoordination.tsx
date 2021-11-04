import clsx from "clsx";
import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";
import { useUpdateCoordinationForm } from "../../api";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { useLayoutStyles } from "../../components/useCommonStyles";
import MultiInstance from "../../components/MultiInstance";
import useAuth from "../../hooks/useAuth";

import { CARE_PROVIDER } from "./constants";
import {
  convertUserToCoordinationForm,
  convertCoordinationFormToUser,
} from "./utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputLabelClass: {
      fontSize: 16,
      fontWeight: 500,
      color: `${theme.palette.primaryNavy.main} !important`,
      marginBottom: theme.spacing(3),
    },
  })
);

const CareCoordination = () => {
  const { user, loadUser } = useAuth();
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const updateCoordinationForm = useUpdateCoordinationForm();

  const defaultCoordinationForm = useMemo(
    () => convertUserToCoordinationForm(user),
    [user]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultCoordinationForm,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = methods.getValues();
    await updateCoordinationForm.mutate(
      convertCoordinationFormToUser(form.extProviders),
      {
        onSuccess: loadUser,
      }
    );
  };

  return (
    <Container>
      <Grid container>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant="h3">Coordination of Care</Typography>
            </Grid>
            <Grid item xs={12} className={layoutClasses.mt1}>
              <Typography variant="subtitle1">
                Coordination of Care allows for your Prairie team to provide
                updates on your care with an outside provider like a therapist
                or your primary care provider. This leads to better outcomes on
                average, since everyone has the latest information about your
                care from your psychiatrist here at Prairie Health.
              </Typography>
              <Typography variant="subtitle1" className={layoutClasses.mt2}>
                Your care team at Prairie Health will share relevant medical
                information with the people with whom you&apos;d like us to
                coordinate care via mail, fax or any other secure methods.
              </Typography>
            </Grid>
            <Grid item xs={12} className={layoutClasses.mt3}>
              <MultiInstance
                label={CARE_PROVIDER.label}
                path="extProviders"
                limit={2}
                properties={CARE_PROVIDER.properties}
                variant="outlined"
                addButton={CARE_PROVIDER.addButton}
                instanceLabel={CARE_PROVIDER.instanceLabel}
                inputLabelClass={clsx(classes.inputLabelClass)}
              />
            </Grid>
            <Grid item xs={12} className={layoutClasses.mt6}>
              <Button
                text="Submit"
                color="primary"
                variant="contained"
                type="submit"
              />
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default CareCoordination;
