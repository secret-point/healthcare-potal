import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import SignIn from "src/containers/auth/SignIn";
import Profile from "src/containers/Profile/Profile";
import Progress from "src/containers/Progress/Progress";
import Dashboard from "src/containers/Dashboard/Dashboard";
import Onboarding from "src/containers/onboarding/Onboarding";
import ResetPassword from "src/containers/auth/ResetPassword";
import AssessmentSurvey from "src/containers/AssessmentSurvey/AssessmentSurvey";
import InTakeForm from "src/containers/InTakeForm/InTakeForm";
import CareCoordination from "src/containers/CareCoordination/CareCoordination";
import PharmacySelection from "src/containers/pharmacy/PharmacySelection";
import ConfirmVerificationLink from "src/containers/auth/ConfirmVerificationLink";
import BookingListPage from "src/containers/booking/BookingListPage";
import FullCareProviderPage from "src/containers/booking/FullCareProviderPage";
import CareProviderIntakePage from "src/containers/booking/CareProviderIntakePage";
import BookingConfirmPage from "src/containers/booking/BookingConfirmPage";

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
          <Route path={ROUTES.ASSESSMENT} exact>
            <AssessmentSurvey />
          </Route>
          <Route path={`${ROUTES.ASSESSMENT}/:assessmentId`} exact>
            <AssessmentSurvey />
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
          <Route path={ROUTES.PHARMACY} exact>
            <PharmacySelection />
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

      <Route path={ROUTES.BOOKING_LIST}>
        <BookingListPage />
      </Route>

      <Route path={`${ROUTES.BOOKING}/:providerId`} exact>
        <FullCareProviderPage />
      </Route>

      <Route path={`${ROUTES.BOOKING}/:providerId/intake`} exact>
        <CareProviderIntakePage />
      </Route>

      <Route path={`${ROUTES.BOOKING}/:providerId/confirm`} exact>
        <BookingConfirmPage />
      </Route>

      <Route path={`${ROUTES.ASSESSMENT}/:assessmentId`} exact>
        <AssessmentSurvey />
      </Route>

      <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: location } }} />
    </Switch>
  );
}
