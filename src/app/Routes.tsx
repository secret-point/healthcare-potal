import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Dashboard from "../containers/Dashboard/Dashboard";
import Profile from "../containers/Profile/Profile";
import SignIn from "../containers/auth/SignIn";
import Onboarding from "../containers/onboarding/Onboarding";
import ResetPassword from "../containers/auth/ResetPassword";
import ConfirmVerificationLink from "../containers/auth/ConfirmVerificationLink";

const useStyles = makeStyles(() =>
  createStyles({
    mainRoot: {
      display: "flex",
    },
    mainContent: {
      flexGrow: 1,
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
          <Route path="/profile" exact>
            <Profile />
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

      <Route path="/verification-link">
        <ConfirmVerificationLink />
      </Route>

      <Redirect to={{ pathname: "/login", state: { from: location } }} />
    </Switch>
  );
}
