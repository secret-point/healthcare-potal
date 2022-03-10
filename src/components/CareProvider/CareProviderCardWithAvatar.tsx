import clsx from "clsx";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import ProfileAvatar from "src/components/ProfileAvatar";
import { Theme } from "src/theme/types/createPalette";
import { ICareMember } from "src/types";
import { useViewport } from "src/hooks/useViewport";

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

    mobileCard: {
      padding: theme.spacing(6, 2),
    },

    profileAvatar: {
      position: "absolute",
      right: theme.spacing(4),
      top: theme.spacing(-7.5),
    },

    mobileProfileAvatar: {
      left: `calc(50% - 32px)`,
      top: -theme.spacing(4),
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
  const { isMobile } = useViewport();

  return (
    <Box className={clsx(classes.card, isMobile && classes.mobileCard)}>
      <ProfileAvatar
        width={isMobile ? 64 : 120}
        height={isMobile ? 64 : 120}
        firstName={careProvider.firstName}
        lastName={careProvider.lastName}
        picture={careProvider.profilePic}
        className={clsx(
          classes.profileAvatar,
          isMobile && classes.mobileProfileAvatar
        )}
      />
      {children}
    </Box>
  );
};

export default CareProviderCardWithAvatar;
