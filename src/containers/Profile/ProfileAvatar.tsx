import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";
import { User } from "../../types/user";

interface StyleProps {
  width: number;
  height: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: (props: StyleProps) => props.width,
      height: (props: StyleProps) => props.height,
      borderRadius: (props: StyleProps) => props.width,
      backgroundColor: theme.palette.accentYellow.main,
    },
  })
);

interface ProfileAvatarProps extends StyleProps {
  user: User;
}

export default function ProfileAvatar({
  width = 40,
  height = 40,
  user,
}: ProfileAvatarProps) {
  const classes = useStyles({ width, height });

  return <div className={classes.avatar}>{user.firstName}</div>;
}
