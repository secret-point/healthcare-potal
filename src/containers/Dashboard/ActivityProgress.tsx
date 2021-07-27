import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PrairieScore from "../../components/Progress/PrairieScore";
import SurveyProgress from "../../components/Progress/SurveyProgress";
import SymptomsReport from "../../components/Progress/SymptomsReport";
import { useLayoutStyles } from "../../components/useCommonStyles";
import { TScoreHistory } from "../../types";

const ActivityProgress = () => {
  const layoutClasses = useLayoutStyles();
  const scoreHistory: TScoreHistory = [
    { score: 20, date: new Date(2021, 6, 1) },
    { score: 25, date: new Date(2021, 6, 3) },
    { score: 10, date: new Date(2021, 6, 5) },
  ];

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb1}>
        Your Progress
      </Typography>
      <Grid container spacing={3}>
        {scoreHistory.length && (
          <Grid item xs={12} sm={12} lg={6}>
            <PrairieScore scoreHistory={scoreHistory} />
          </Grid>
        )}
        <Grid item xs={12} sm={6} lg={3}>
          <SurveyProgress />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <SymptomsReport />
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityProgress;
