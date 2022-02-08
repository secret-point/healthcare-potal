import clsx from "clsx";
import { FC } from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ROUTES } from "src/app/types";
import { Theme } from "src/theme/types/createPalette";
import { getCapitalizedFirstLetters } from "src/utils/string";

interface StyleProps {
  width?: number;
  height?: number;
  isClickable?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      cursor: (props: StyleProps) =>
        props.isClickable ? "pointer" : "default",
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
  isClickable = false,
  height = 40,
  width = 40,
  firstName,
  lastName,
  picture,
}) => {
  const history = useHistory();
  const classes = useStyles({ isClickable, height, width });

  const handleClickAvatar = () => {
    if (!isClickable) return;
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
