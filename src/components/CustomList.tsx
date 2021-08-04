import { FC } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { get as _get } from "lodash";

import { TCustomField } from "../types/general";
import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      padding: theme.spacing(0),
    },

    listItem: {
      padding: theme.spacing(1.5, 3),
      backgroundColor: "white",
      border: `1px solid ${theme.palette.backgroundGray.main}`,

      display: "flex",
      justifyContent: "space-between",
    },

    listValue: {
      color: theme.palette.secondaryNavy2.main,
    },
  })
);

interface CustomListProps {
  value: any;
  fields: Array<TCustomField>;
}

const CustomList: FC<CustomListProps> = ({ value, fields }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {fields.map((field) => (
        <ListItem key={field.label} className={classes.listItem}>
          <Typography variant="subtitle1">{field.label}</Typography>
          {field.render ? (
            field.render(_get(value, field.path))
          ) : (
            <Typography variant="subtitle1" className={classes.listValue}>
              {_get(value, field.path)}
            </Typography>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default CustomList;
