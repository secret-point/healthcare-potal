import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import PrairieScoreHistory from "./components/PrairieScoreHistory";
import PrairieStatusCardSlices from "./components/PrairieStatusCardSlices";

import { mockScoreHistory } from "./constants";

const ProgressHistory = () => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

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
        <Grid item xs={8}>
          <PrairieScoreHistory scoreHistory={mockScoreHistory} />
        </Grid>
        <Grid item xs={4}>
          <PrairieStatusCardSlices scores={mockScoreHistory} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProgressHistory;
