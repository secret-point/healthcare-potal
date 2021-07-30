import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";

const GreatStrides = () => {
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={layoutClasses.fullHeight}>
      <CardContent className={clsx(layoutClasses.padding3, layoutClasses.mb1)}>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="h3">
              You’re making great strides! 🎉
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Your score &nbsp;
              <b
                className={clsx(
                  colorClasses.secondaryGreen1,
                  fontClasses.fontBolder
                )}
              >
                decreased by 3 points
              </b>
              &nbsp;since May 25, 2021. This means you’ve been experienceing
              less symptoms related to anxiety and depression.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GreatStrides;
