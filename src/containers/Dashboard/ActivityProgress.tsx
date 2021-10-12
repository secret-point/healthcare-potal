import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// import { useFetchScoreHistory } from "../../api/progressApi";
import PrairieScore from "../../components/Progress/PrairieScore";
import SurveyProgress from "../../components/Progress/SurveyProgress";
import SymptomsReport from "../../components/Progress/SymptomsReport";
import { useLayoutStyles } from "../../components/useCommonStyles";
import { mockScoreHistory } from "../Progress/mockScores";

const ActivityProgress = () => {
  const layoutClasses = useLayoutStyles();
  // const { data: scoreHistory = [] } = useFetchScoreHistory();

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb3}>
        Your Progress
      </Typography>
      <Grid container spacing={3}>
        {mockScoreHistory.length && (
          <Grid item xs={12} sm={12} lg={6}>
            <PrairieScore scoreHistory={mockScoreHistory} />
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
