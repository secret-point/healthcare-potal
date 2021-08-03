import clsx from "clsx";
import { FC } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Variant } from "@material-ui/core/styles/createTypography";

import { useFontStyles } from "./useCommonStyles";

interface LinkProps {
  title: string;
  link?: string;
  className?: string;
  variant?: Variant;
}

const MenuLink: FC<LinkProps> = ({
  title,
  link,
  className,
  variant = "body2",
}) => {
  const fontClasses = useFontStyles();

  return (
    <Link
      to={link || ""}
      className={clsx(fontClasses.noneTextDecoration, className)}
    >
      <Typography
        variant={variant}
        className={clsx(fontClasses.fontNormal, className)}
      >
        {title}
      </Typography>
    </Link>
  );
};

export default MenuLink;
