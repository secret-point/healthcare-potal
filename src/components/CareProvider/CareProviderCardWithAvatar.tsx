import { FC } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import ProfileAvatar from "src/components/ProfileAvatar";
import { Theme } from "src/theme/types/createPalette";
import { ICareMember } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "white",
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
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
    <Box className={classes.card}>
      <ProfileAvatar
        width={120}
        height={120}
        firstName={careProvider.firstName}
        lastName={careProvider.lastName}
        picture={careProvider.profilePic}
        className={classes.profileAvatar}
      />
      {children}
    </Box>
  );
};

export default CareProviderCardWithAvatar;
