import clsx from "clsx";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";
import { useFontStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: "none",
      alignSelf: "center",
    },
    linkTypography: {
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface LinkProps {
  align?: "left" | "center" | "right";
  to: string;
  text: string;
  className?: string;
}

const Link = ({ align, className, to, text }: LinkProps) => {
  const classes = useStyles();

  return (
    <RouterLink to={to} className={clsx(classes.link, className)}>
      <Typography
        align={align}
        variant="subtitle1"
        className={classes.linkTypography}
      >
        {text}
      </Typography>
    </RouterLink>
  );
};

export const ButtonLink: FC<LinkProps> = ({
  align = "left",
  className,
  to,
  text,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles()();

  return (
    <RouterLink to={to} className={clsx(classes.link, className)}>
      <Typography
        align={align}
        variant="subtitle1"
        className={clsx(classes.linkTypography, fontClasses.fontBolder)}
      >
        {text}
      </Typography>
    </RouterLink>
  );
};

export default Link;
