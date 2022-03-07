import { FC } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import ProfileAvatar from "src/components/ProfileAvatar";
import { Theme } from "src/theme/types/createPalette";
import { ICareMember } from "src/types";

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

interface ICareProviderAvatarCardProps {
  careProvider: ICareMember;
}

const CareProviderCardWithAvatar: FC<ICareProviderAvatarCardProps> = ({
  careProvider,
  children,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <ProfileAvatar
        width={120}
        height={120}
        firstName={careProvider.firstName}
        lastName={careProvider.lastName}
        picture={careProvider.profilePic}
        className={classes.profileAvatar}
      />
      {children}
    </Card>
  );
};

export default CareProviderCardWithAvatar;
