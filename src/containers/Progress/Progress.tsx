import Grid from "@material-ui/core/Grid";

import Container from "../../components/Container";
import { useLayoutStyles } from "../../components/useCommonStyles";

import LatestProgress from "./LatestProgress";
import ProgressHistory from "./ProgressHistory";

import {
  mockScoreHistory1,
  mockScoreHistory2,
  mockScoreHistory3,
  mockScoreHistory4,
  mockScoreHistory5,
  mockScoreHistory6,
  mockScoreHistory7,
  mockScoreHistory8,
  mockScoreHistory9,
} from "./mockScores";
import ProgressSummary from "./components/ProgressSummary";

const Progress = () => {
  const layoutClasses = useLayoutStyles();

  return (
    <Container>
      <Grid item xs={12} className={layoutClasses.mb4}>
        <LatestProgress />
      </Grid>

      <Grid item xs={12} container className={layoutClasses.mb4}>
        {[
          mockScoreHistory1,
          mockScoreHistory2,
          mockScoreHistory3,
          mockScoreHistory4,
          mockScoreHistory5,
          mockScoreHistory6,
          mockScoreHistory7,
          mockScoreHistory8,
          mockScoreHistory9,
        ].map((scoreHistory, index) => (
          <Grid key={index} item xs={12} md={6}>
            <ProgressSummary history={scoreHistory} />
          </Grid>
        ))}
      </Grid>

      <Grid item xs={12}>
        <ProgressHistory />
      </Grid>
    </Container>
  );
};

export default Progress;
