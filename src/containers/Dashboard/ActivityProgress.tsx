import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PrairieScore from "../../components/Progress/PrairieScore";
import SurveyProgress from "../../components/Progress/SurveyProgress";
import SymptomsReport from "../../components/Progress/SymptomsReport";
import { useLayoutStyles } from "../../components/useCommonStyles";
import { ScoreHistory } from "../../types";

const ActivityProgress = () => {
  const layoutClasses = useLayoutStyles();
  const scoreHistory: ScoreHistory = {
    previousScore: 29,
    currentScore: 23,
    date: new Date(2021, 6, 6),
  };

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb1}>
        Your Progress
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <PrairieScore scoreHistory={scoreHistory} />
        </Grid>
        <Grid item xs={3}>
          <SurveyProgress />
        </Grid>
        <Grid item xs={3}>
          <SymptomsReport />
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityProgress;
