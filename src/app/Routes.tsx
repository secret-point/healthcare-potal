import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Dashboard from "../containers/Dashboard/Dashboard";
import SignIn from "../containers/auth/SignIn";
import Onboarding from "../containers/onboarding/Onboarding";
import ResetPassword from "../containers/auth/ResetPassword";
import CheckInbox from "../containers/auth/CheckInbox";

const useStyles = makeStyles((theme) =>
  createStyles({
    mainRoot: {
      display: "flex",
    },
    mainContent: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
  })
);

export function AuthorizedRoutes() {
  const classes = useStyles();
  const defaultRedirect = "/dashboard";

  return (
    <div className={classes.mainRoot}>
      <main className={classes.mainContent}>
        <Switch>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Redirect to={defaultRedirect} />
        </Switch>
      </main>
    </div>
  );
}

export function UnauthorizedRoutes() {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/login">
        <SignIn />
      </Route>

      <Route path="/register">
        <Onboarding />
      </Route>

      <Route path="/reset-password">
        <ResetPassword />
      </Route>

      <Route path="/verification-code">
        <CheckInbox />
      </Route>

      <Redirect to={{ pathname: "/login", state: { from: location } }} />
    </Switch>
  );
}
