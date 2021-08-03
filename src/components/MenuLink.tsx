import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Variant } from "@material-ui/core/styles/createTypography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectedLink: {
      color: theme.palette.secondaryGreen1.main,
      textDecoration: "underline",
    },
  })
);

import { useFontStyles } from "./useCommonStyles";

interface LinkProps {
  title: string;
  link?: string;
  selected?: boolean;
  className?: string;
  variant?: Variant;
}

const MenuLink: FC<LinkProps> = ({
  title,
  link,
  selected,
  className,
  variant = "body2",
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();

  return (
    <Link
      to={link || ""}
      className={clsx(fontClasses.noneTextDecoration, className)}
    >
      <Typography
        variant={variant}
        className={clsx(
          fontClasses.fontNormal,
          selected && classes.selectedLink,
          className
        )}
      >
        {title}
      </Typography>
    </Link>
  );
};

export default MenuLink;
