import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import InTakeFormGroupInput from "src/components/InTake/InTakeFormGroupInput";
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

interface ProfileSetUpCardProps {}

const ProfileSetUpCard: FC<ProfileSetUpCardProps> = () => {
  const classes = useStyles();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  return (
    <Card className={classes.card}>
      <FormProvider {...methods}>
        {PROFILE_FIELD_GROUPS.map((group) => (
          <InTakeFormGroupInput key={group.groupName} group={group} />
        ))}
      </FormProvider>
    </Card>
  );
};

export default ProfileSetUpCard;
