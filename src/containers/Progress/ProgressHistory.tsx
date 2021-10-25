import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useFetchProgressList } from "../../api/memberApi";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import PrairieScoreHistory from "./components/PrairieScoreHistory";
import PrairieStatusCardSlices from "./components/PrairieStatusCardSlices";

const ProgressHistory = () => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const { data: progressList = [] } = useFetchProgressList();
  const [active, setActive] = useState(progressList.length - 1);

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
        <Typography variant="h2" className={fontClasses.font500}>
          Your Progress History
        </Typography>
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
