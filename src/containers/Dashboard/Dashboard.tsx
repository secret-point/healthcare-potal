import { useState } from "react";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "../../theme/types/createPalette";

import { ROUTES } from "../../app/types";
import { TodoItemType, TTodoItem } from "../../types";
import Container from "../../components/Container";
import VerifyIDDialog from "../../components/VerifyID/VerifyIDDialog";

import CareTeam from "./CareTeam";
import TodoList from "./TodoList";
import ActivityProgress from "./ActivityProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
    todoListWrapper: {
      width: 1024,
      maxWidth: "90vw",
      marginLeft: theme.spacing(-1.5),
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [showVerifyIDDialog, setShowVerifyIDDialog] = useState(false);

  const handleCloseVerifyIDDialog = () => {
    setShowVerifyIDDialog(false);
  };

  const handleClickTodoItem = (item: TTodoItem) => {
    switch (item.todoItemType) {
      case TodoItemType.COMPLETE_INTAKE_FORM:
        history.push(ROUTES.INTAKE_FORM);
        break;
      case TodoItemType.CHECK_YOUR_PROGRESS:
        history.push(ROUTES.PROGRESS);
        break;
      case TodoItemType.VERIFY_ID:
        setShowVerifyIDDialog(true);
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Grid container spacing={6} className={classes.container}>
        <Grid item xs={12} className={classes.todoListWrapper}>
          <TodoList onClickItem={handleClickTodoItem} />
        </Grid>

        <Grid item xs={12}>
          <CareTeam />
        </Grid>

        <Grid item xs={12}>
          <ActivityProgress />
        </Grid>
      </Grid>

      <VerifyIDDialog
        open={showVerifyIDDialog}
        onClose={handleCloseVerifyIDDialog}
      />
    </Container>
  );
}
