import { useState } from "react";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "src/theme/types/createPalette";

import { ROUTES } from "src/app/types";
import { TodoItemType, TTodoItem } from "src/types";
import Container from "src/components/Container";
import VerifyIDDialog from "src/components/VerifyID/VerifyIDDialog";
import useAuth from "src/hooks/useAuth";

import CareTeam from "./CareProviders";
import TodoList from "./TodoList";
import ActivityProgress from "./ActivityProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
    todoListWrapper: {
      width: "calc(100vw - 160px)",
      marginLeft: theme.spacing(-1.5),
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useAuth();
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
      case TodoItemType.TRACK_YOUR_PROGRESS:
        history.push(ROUTES.ASSESSMENT);
        break;
      case TodoItemType.VERIFY_ID:
        setShowVerifyIDDialog(true);
        break;
      default:
        break;
    }
  };

  if (!user) return null;

  return (
    <Container>
      <Grid container spacing={6} className={classes.container}>
        <Grid item xs={12}>
          <Grid container className={classes.todoListWrapper}>
            <TodoList user={user} onClickItem={handleClickTodoItem} />
          </Grid>
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
