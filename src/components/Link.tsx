import clsx from "clsx";
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
}

const Link = ({ align, to, text }: LinkProps) => {
  const classes = useStyles();

  return (
    <RouterLink to={to} className={classes.link}>
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

export const ButtonLink = ({ align = "left", to, text }: LinkProps) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  return (
    <RouterLink to={to} className={classes.link}>
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
