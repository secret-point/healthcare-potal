import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ROUTES } from "../../app/types";
import { ButtonLink } from "../../components/Link";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";

import ProgressSummary from "./components/ProgressSummary";
import CheckInNotice from "./components/CheckInNotice";
import LatestPrairieScore from "./components/LatestPrairieScore";
import { mockScoreHistory } from "./constants";

const LatestProgress = () => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const previousItem = mockScoreHistory[mockScoreHistory.length - 2];
  const latestItem = mockScoreHistory[mockScoreHistory.length - 1];

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        justify="space-between"
        alignItems="center"
        className={layoutClasses.mb2}
      >
        <Typography variant="h2" className={fontClasses.font500}>
          Your Latest Progress
        </Typography>
        <ButtonLink text="Update my score" to={ROUTES.CHECKIN} align="left" />
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="stretch"
        className={layoutClasses.mb3}
      >
        <Grid item xs={6}>
          <LatestPrairieScore
            previousItem={previousItem}
            latestItem={latestItem}
          />
        </Grid>
        <Grid item xs={6}>
          <ProgressSummary history={mockScoreHistory} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CheckInNotice
          latestItem={mockScoreHistory[mockScoreHistory.length - 1]}
        />
      </Grid>
    </Grid>
  );
};

export default LatestProgress;
