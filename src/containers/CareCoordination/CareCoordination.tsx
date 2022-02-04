import clsx from "clsx";
import { FC, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import { useUpdateCoordinationForm } from "src/api";
import { ROUTES } from "src/app/types";
import Button from "src/components/Button";
import Container from "src/components/Container";
import {
  useColorStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import MultiInstance from "src/components/MultiInstance";
import { useAuth } from "src/hooks/useAuth";
import { useNotification } from "src/hooks/useNotification";
import { getFormErrorMessages } from "src/utils/helper";

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

interface CoordinationFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const CoordinationForm: FC<CoordinationFormProps> = ({ onSubmit }) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleSumbit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const result = await trigger();
    if (!result) {
      return;
    }

    onSubmit(event);
  };

  const errorMessages = useMemo(() => getFormErrorMessages(errors), [errors]);

  return (
    <form onSubmit={handleSumbit}>
      <Grid item xs={12}>
        <Typography variant="h3">Coordination of Care</Typography>
      </Grid>
      <Grid item xs={12} className={layoutClasses.mt1}>
        <Typography variant="subtitle1">
          Coordination of Care allows for your Prairie team to provide updates
          on your care with an outside provider like a therapist or your primary
          care provider. This leads to better outcomes on average, since
          everyone has the latest information about your care from your
          psychiatrist here at Prairie Health.
        </Typography>
        <Typography variant="subtitle1" className={layoutClasses.mt2}>
          Your care team at Prairie Health will share relevant medical
          information with the people with whom you&apos;d like us to coordinate
          care via mail, fax or any other secure methods.
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
      {Boolean(errorMessages.length) && (
        <Grid container spacing={1} className={layoutClasses.mt2}>
          {errorMessages.map((message, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body2" className={colorClasses.accentRed}>
                {message}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <Grid item xs={12} className={layoutClasses.mt6}>
        <Button
          text="Submit"
          color="primary"
          variant="contained"
          type="submit"
        />
      </Grid>
    </form>
  );
};

const CareCoordination = () => {
  const history = useHistory();
  const { user, loadUser } = useAuth();
  const updateCoordinationForm = useUpdateCoordinationForm();
  const { handleSuccess, handleError } = useNotification();

  const defaultCoordinationForm = useMemo(
    () => convertUserToCoordinationForm(user),
    [user]
  );

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultCoordinationForm,
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const form = methods.getValues();
    await updateCoordinationForm.mutate(
      convertCoordinationFormToUser(form.extProviders),
      {
        onSuccess: async () => {
          handleSuccess(
            "You have sucessfully updated your external providers."
          );
          await loadUser();
          history.push(ROUTES.DASHBOARD);
        },
        onError: (error) => {
          handleError(
            error,
            "There was an error while updating your care coordinators."
          );
        },
      }
    );
  };

  return (
    <Container>
      <Grid container>
        <FormProvider {...methods}>
          <CoordinationForm onSubmit={handleSubmit} />
        </FormProvider>
      </Grid>
    </Container>
  );
};

export default CareCoordination;
