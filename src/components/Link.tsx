import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: theme.palette.linkColor.main,
      textDecoration: "none",
    },
  })
);

interface LinkProps {
  align: "left" | "center" | "right";
  to: string;
  text: string;
}

const Link = ({ align, to, text }: LinkProps) => {
  const classes = useStyles();

  return (
    <RouterLink to={to} className={classes.link}>
      <Typography align={align} variant="body1">
        {text}
      </Typography>
    </RouterLink>
  );
};

export default Link;
