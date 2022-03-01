import cloneDeep from "lodash/cloneDeep";
import { FC, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles } from "@material-ui/core/styles";

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

  return (
    <Card className={classes.card}>
      <FormProvider {...methods}>
        {updatedProfileFieldGroups.map((group) => (
          <InTakeFormGroupInput key={group.groupName} group={group} />
        ))}
      </FormProvider>
    </Card>
  );
};

export default ProfileSetUpCard;
