import Grid from "@material-ui/core/Grid";

import PrairieScore from "../../components/Progress/PrairieScore";
import SurveyProgress from "../../components/Progress/SurveyProgress";
import SymptomsReport from "../../components/Progress/SymptomsReport";

const ActivityProgress = () => (
  <Grid container>
    <Grid item xs={6}>
      <PrairieScore />
    </Grid>
    <Grid item xs={3}>
      <SurveyProgress />
    </Grid>
    <Grid item xs={3}>
      <SymptomsReport />
    </Grid>
  </Grid>
);

export default ActivityProgress;
