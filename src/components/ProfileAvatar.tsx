import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { User } from "../types/user";
import { getCapitalizedFirstLetters } from "../utils/string";
import { ROUTES } from "../app/types";

interface StyleProps {
  width?: number;
  height?: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      cursor: "pointer",
      width: (props: StyleProps) => props.width,
      height: (props: StyleProps) => props.height,
      borderRadius: (props: StyleProps) => props.width,
      backgroundColor: theme.palette.accentYellow.main,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    avatarLetter: {
      fontWeight: 400,
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
  const history = useHistory();
  const classes = useStyles({ width, height });

  const handleClickAvatar = () => {
    history.push(ROUTES.PROFILE);
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      className={classes.avatar}
      onClick={handleClickAvatar}
    >
      <Typography variant="h3" className={classes.avatarLetter}>
        {getCapitalizedFirstLetters([user.firstName, user.lastName]).join("")}
      </Typography>
    </div>
  );
}
