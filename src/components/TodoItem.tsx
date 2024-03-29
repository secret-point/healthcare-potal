import { FC } from "react";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { TodoItemType, TTodoItem } from "src/types";
import { formatFullDay } from "src/utils/date";

import { TextButton } from "./Button";
import {
  useCardStyles,
  useFontStyles,
  useLayoutStyles,
} from "./useCommonStyles";

interface TodoItemProps {
  item: TTodoItem;
  onClick: VoidFunction;
}

const TodoItem: FC<TodoItemProps> = ({ item, onClick }) => {
  const cardClasses = useCardStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const buttonText = (() => {
    switch (item.todoItemType) {
      case TodoItemType.COMPLETE_INTAKE_FORM:
        return "Complete intake form";
      case TodoItemType.VERIFY_ID:
        return "Verify";
      case TodoItemType.CHECK_YOUR_PROGRESS:
        return "Take the survey";
      case TodoItemType.TRACK_YOUR_PROGRESS:
        return "Take the assessment";
      case TodoItemType.CHOOSE_YOUR_PHARMACY:
        return "Update preference";
      default:
        return null;
    }
  })();

  const headerText = (() => {
    switch (item.todoItemType) {
      case TodoItemType.COMPLETE_INTAKE_FORM:
        return "Complete your profile";
      case TodoItemType.VERIFY_ID:
        return "Verify your ID";
      case TodoItemType.CHECK_YOUR_PROGRESS:
        return "Check your progress";
      case TodoItemType.TRACK_YOUR_PROGRESS:
        return "Track your progress";
      case TodoItemType.CHOOSE_YOUR_PHARMACY:
        return "Choose your pharmacy";
      default:
        return null;
    }
  })();

  if (!buttonText) return null;

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb2)}>
        <Typography
          variant="h3"
          className={clsx(fontClasses.fontNormal, layoutClasses.mb1)}
        >
          {headerText}
        </Typography>
        {item.todoItemType !== TodoItemType.TRACK_YOUR_PROGRESS && (
          <Typography variant="subtitle2" className={fontClasses.fontNormal}>
            {["By", formatFullDay(item.dueDate)].join(" ")}
          </Typography>
        )}
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <TextButton text={buttonText} onClick={onClick} />
      </CardActions>
    </Card>
  );
};

export default TodoItem;
