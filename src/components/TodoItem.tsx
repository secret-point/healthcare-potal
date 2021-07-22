import { FC } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "../theme/types/createPalette";

import { TodoItemType, TTodoItem } from "../types";
import { formatFullDay } from "../utils/date";
import { EditButton } from "./Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    todoItem: {
      height: "100%",
      padding: theme.spacing(3),
      borderRadius: theme.spacing(1),
      borderColor: theme.palette.secondaryGreen1.main,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    noPadding: {
      padding: 0,
    },
    normalFontWeight: {
      fontWeight: 400,
    },
    mb1: {
      marginBottom: theme.spacing(1),
    },
    mb2: {
      marginBottom: theme.spacing(2),
    },
  })
);

interface TodoItemProps {
  item: TTodoItem;
  onClick: VoidFunction;
}

const TodoItem: FC<TodoItemProps> = ({ item, onClick }) => {
  const classes = useStyles();

  const itemActionTitle = (() => {
    switch (item.type) {
      case TodoItemType.COMPLETE_INTAKE_FORM:
        return "Complete intake form";
      case TodoItemType.VERIFY_ID:
        return "Verify";
      case TodoItemType.CHECK_YOUR_PROGRESS:
        return "Take the survey";
      default:
        return null;
    }
  })();

  if (!itemActionTitle) return null;

  return (
    <Card variant="outlined" className={classes.todoItem}>
      <CardContent className={clsx(classes.noPadding, classes.mb2)}>
        <Typography
          variant="h3"
          className={clsx(classes.normalFontWeight, classes.mb1)}
        >
          {item.title}
        </Typography>
        <Typography variant="body2" className={classes.normalFontWeight}>
          {["By", formatFullDay(item.dueDate)].join(" ")}
        </Typography>
      </CardContent>
      <CardActions className={classes.noPadding}>
        <EditButton title={itemActionTitle} onClick={onClick} />
      </CardActions>
    </Card>
  );
};

export default TodoItem;
