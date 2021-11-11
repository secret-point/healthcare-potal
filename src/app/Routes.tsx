import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import SignIn from "../containers/auth/SignIn";
import Profile from "../containers/Profile/Profile";
import Progress from "../containers/Progress/Progress";
import Dashboard from "../containers/Dashboard/Dashboard";
import Onboarding from "../containers/onboarding/Onboarding";
import ResetPassword from "../containers/auth/ResetPassword";
import CheckInSurvey from "../containers/CheckInSurvey/CheckInSurvey";
import InTakeForm from "../containers/InTakeForm/InTakeForm";
import CareCoordination from "../containers/CareCoordination/CareCoordination";
import ConfirmVerificationLink from "../containers/auth/ConfirmVerificationLink";

import { ROUTES } from "./types";

const useStyles = makeStyles(() =>
  createStyles({
    mainRoot: {
      display: "flex",
    },
    mainContent: {
      flexGrow: 1,
      overflowX: "hidden",
    },
  })
);

export function AuthorizedRoutes() {
  const classes = useStyles();

  return (
    <div className={classes.mainRoot}>
      <main className={classes.mainContent}>
        <Switch>
          <Route path={ROUTES.DASHBOARD} exact>
            <Dashboard />
          </Route>
          <Route path={ROUTES.PROFILE} exact>
            <Profile />
          </Route>
          <Route path={ROUTES.CHECKIN} exact>
            <CheckInSurvey />
          </Route>
          <Route path={ROUTES.PROGRESS} exact>
            <Progress />
          </Route>
          <Route path={ROUTES.INTAKE_FORM} exact>
            <InTakeForm />
          </Route>
          <Route path={ROUTES.CARE_COORDINATION} exact>
            <CareCoordination />
          </Route>
          <Redirect to={ROUTES.DASHBOARD} />
        </Switch>
      </main>
    </div>
  );
}

export function UnauthorizedRoutes() {
  const location = useLocation();

  return (
    <Switch>
      <Route path={ROUTES.LOGIN}>
        <SignIn />
      </Route>

      <Route path={ROUTES.REGISTER}>
        <Onboarding />
      </Route>

      <Route path={ROUTES.RESET_PASSWORD}>
        <ResetPassword />
      </Route>

      <Route path={ROUTES.VERIFICATION_LINK}>
        <ConfirmVerificationLink />
      </Route>

      <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: location } }} />
    </Switch>
  );
}
