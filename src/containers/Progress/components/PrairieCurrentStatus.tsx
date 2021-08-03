import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { TScoreItem } from "../../../types";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";
import PrairieStatus from "./PrairieStatus";

interface PrairieCurrentStatusProps {
  score: TScoreItem;
}

const PrairieCurrentStatus: FC<PrairieCurrentStatusProps> = ({ score }) => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, layoutClasses.pb0)}
    >
      <Grid container>
        <Grid item xs={12} className={layoutClasses.mb2}>
          <Typography variant="h3">
            {dayjs(score.date).format("MMM D, YYYY")}
          </Typography>
        </Grid>

        <Grid item xs={12} alignItems="flex-end" className={layoutClasses.mb2}>
          <Typography variant="body2">PrairieScore</Typography>

          <Box width={1} display="flex" alignItems="flex-end">
            <Typography variant="h2">{score.score}</Typography>
            <Typography
              variant="body1"
              className={clsx(colorClasses.secondaryGreen1, layoutClasses.ml1)}
            >
              (-6)
            </Typography>
          </Box>
        </Grid>

        <Grid container className={layoutClasses.mb2}>
          <Grid item xs={12}>
            <Typography variant="body2">Severity</Typography>
          </Grid>
          <PrairieStatus current={score.severity} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">Symptoms</Typography>
          <Typography variant="body1">{score.symptoms.join(",")}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieCurrentStatus;
