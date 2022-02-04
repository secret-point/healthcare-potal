import clsx from "clsx";
import { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { get as _get } from "lodash";

import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";
import { TCustomField } from "src/types/general";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: theme.spacing(0),
    },

    listItem: {
      padding: theme.spacing(1.5, 2),
      backgroundColor: "white",
      border: `1px solid ${theme.palette.backgroundGray.main}`,

      display: "flex",
      justifyContent: "space-between",
    },

    listValue: {
      color: theme.palette.secondaryNavy2.main,
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },

    mobileValue: {
      maxWidth: 200,
    },
  })
);

interface CustomListProps {
  value: any;
  fields: Array<TCustomField>;
}

const CustomList: FC<CustomListProps> = ({ value, fields }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();

  return (
    <List className={classes.list}>
      {fields.map((field) => (
        <ListItem key={field.label} className={classes.listItem}>
          <Typography variant="subtitle1">{field.label}</Typography>
          {field.render ? (
            field.render(_get(value, field.path))
          ) : (
            <Typography
              variant="subtitle1"
              className={clsx(
                classes.listValue,
                isMobile && classes.mobileValue
              )}
            >
              {_get(value, field.path)}
            </Typography>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CustomList;
