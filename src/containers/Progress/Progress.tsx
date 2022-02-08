import Grid from "@material-ui/core/Grid";

import Container from "src/components/Container";
import { useLayoutStyles } from "src/components/useCommonStyles";

import LatestProgress from "./LatestProgress";
import ProgressHistory from "./ProgressHistory";

const Progress = () => {
  const layoutClasses = useLayoutStyles();

  return (
    <Container>
      <Grid item xs={12} className={layoutClasses.mb5}>
        <LatestProgress />
      </Grid>

      <Grid item xs={12}>
        <ProgressHistory />
      </Grid>
    </Container>
  );
};

export default Progress;
