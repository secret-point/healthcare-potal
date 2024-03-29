import dayjs from "dayjs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useFetchProgressList } from "src/api/memberApi";
import PrairieScore from "src/components/Progress/PrairieScore";
import SurveyProgress from "src/components/Progress/SurveyProgress";
import SymptomsReport from "src/components/Progress/SymptomsReport";
import { useLayoutStyles } from "src/components/useCommonStyles";

const ActivityProgress = () => {
  const layoutClasses = useLayoutStyles();
  const { data: progressList = [] } = useFetchProgressList(true);
  const lastProgress = progressList[progressList.length - 1];
  const diffInWeeks = dayjs().diff(lastProgress?.updatedAt, "weeks");

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb3}>
        Your Progress
      </Typography>
      <Grid container spacing={3}>
        {Boolean(progressList.length) && (
          <Grid item xs={12} sm={12} lg={6}>
            <PrairieScore progressList={progressList} />
          </Grid>
        )}
        {lastProgress && diffInWeeks >= 2 && (
          <Grid item xs={12} sm={6} lg={3}>
            <SurveyProgress lastProgress={lastProgress} />
          </Grid>
        )}
        <Grid item xs={12} sm={6} lg={3}>
          <SymptomsReport />
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityProgress;
