import clsx from "clsx";
import { FC } from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
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

    roundedImage: {
      borderRadius: (props: StyleProps) =>
        Math.max(props.width || 40, props.height || 40),
    },
  })
);

interface ProfileAvatarProps extends StyleProps {
  className?: string;
  firstName: string;
  lastName: string;
  picture: Nullable<string>;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  className,
  height = 40,
  width = 40,
  firstName,
  lastName,
  picture,
}) => {
  const history = useHistory();
  const classes = useStyles({ width, height });

  const handleClickAvatar = () => {
    history.push(ROUTES.PROFILE);
  };

  return (
    <div
      role="button"
      tabIndex={-1}
      className={clsx(classes.avatar, className)}
      onClick={handleClickAvatar}
    >
      {picture ? (
        <img
          width={width}
          height={height}
          alt={[firstName, lastName].join(" ")}
          src={picture}
          className={classes.roundedImage}
        />
      ) : (
        <Typography variant="h3" className={classes.avatarLetter}>
          {getCapitalizedFirstLetters([firstName, lastName]).join("")}
        </Typography>
      )}
    </div>
  );
};

export default ProfileAvatar;
