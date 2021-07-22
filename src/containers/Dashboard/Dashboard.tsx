import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Container from "../../components/Container";
import { Theme } from "../../theme/types/createPalette";
import CareTeam from "./CareTeam";
import TodoList from "./TodoList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.backgroundGreen.main,
    },
    todoListWrapper: {
      width: "calc(100vw - 24px)",
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Container>
      <Grid container className={classes.container}>
        <Grid item xs={12} className={classes.todoListWrapper}>
          <TodoList />
        </Grid>

        <Grid item xs={12}>
          <CareTeam />
        </Grid>
      </Grid>
    </Container>
  );
}
