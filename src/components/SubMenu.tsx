import { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TMenuItem } from "../types/general";
import MenuLink from "./MenuLink";
import { useLayoutStyles } from "./useCommonStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    subMenuItem: {
      marginBottom: theme.spacing(1.5),
    },
  })
);

interface SubMenuProps {
  main: string;
  selectedPath: string;
  className?: string;
  links: TMenuItem[];
}

const SubMenu: FC<SubMenuProps> = ({
  main,
  links,
  selectedPath,
  className,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Box width={1} className={className}>
      <Typography variant="body2" className={layoutClasses.mb2}>
        {main}
      </Typography>
      <Box ml={2}>
        {links.map((item) => (
          <MenuLink
            key={item.title}
            title={item.title}
            link={item.link}
            variant="h4"
            className={classes.subMenuItem}
            selected={selectedPath === item.link}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SubMenu;
