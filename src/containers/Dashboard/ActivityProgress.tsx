import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PrairieScore from "../../components/Progress/PrairieScore";
import SurveyProgress from "../../components/Progress/SurveyProgress";
import SymptomsReport from "../../components/Progress/SymptomsReport";
import { useLayoutStyles } from "../../components/useCommonStyles";

const ActivityProgress = () => {
  const layoutClasses = useLayoutStyles();

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb1}>
        Your Care Team
      </Typography>
      <Grid container spacing={3}>
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
    </>
  );
};

export default ActivityProgress;
