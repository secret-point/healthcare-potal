import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ROUTES } from "../../app/types";
import { useFetchProgressList } from "../../api/memberApi";
import { useLayoutStyles } from "../../components/useCommonStyles";
import PrairieScoreHistory from "./components/PrairieScoreHistory";
import PrairieStatusCardSlices from "./components/PrairieStatusCardSlices";

const ProgressHistory = () => {
  const history = useHistory();
  const layoutClasses = useLayoutStyles();
  const { data: progressList = [], isSuccess } = useFetchProgressList();
  const [active, setActive] = useState(progressList.length - 1);

  useEffect(() => {
    setActive(progressList.length - 1);
  }, [progressList]);

  useEffect(() => {
    if (isSuccess && !progressList.length) {
      history.push(ROUTES.ASSESSMENT);
    }
  }, [isSuccess, history, progressList]);

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        alignItems="center"
        justify="space-between"
        className={layoutClasses.mb2}
      >
        <Typography variant="h2">Your Progress History</Typography>
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="stretch"
        className={layoutClasses.mb3}
      >
        <Grid item xs={12} md={8}>
          <PrairieScoreHistory active={active} scoreHistory={progressList} />
        </Grid>
        <Grid item xs={12} md={4}>
          <PrairieStatusCardSlices
            active={active}
            scores={progressList}
            onUpdateActive={setActive}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProgressHistory;
