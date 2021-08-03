import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ResponsiveLine } from "@nivo/line";
// @ts-ignore
import { linearGradientDef } from "@nivo/core";

import { EditButton } from "../Button";
import { TScoreHistory } from "../../types/general";
import { formatFullDay } from "../../utils/date";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../useCommonStyles";

const useStyles = makeStyles(() =>
  createStyles({
    responsiveLineWrapper: {
      height: 180,
      maxWidth: 300,
    },
  })
);

interface PrairieScoreProps {
  scoreHistory: TScoreHistory;
}

const PrairieScore = ({ scoreHistory }: PrairieScoreProps) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const data = useMemo(() => {
    if (!scoreHistory.length) return { id: "Score", data: [] };
    const firstDate = scoreHistory[0].date;
    return [
      {
        id: "Score",
        data: scoreHistory.map((history) => ({
          x: dayjs(firstDate).diff(history.date, "day"),
          y: history.score,
        })),
      },
    ] as any;
  }, [scoreHistory]);

  if (!scoreHistory.length) return null;
  const firstScoreItem = scoreHistory[0];
  const lastScoreItem = scoreHistory[scoreHistory.length - 1];

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, layoutClasses.pb0)}
    >
      <Grid container spacing={1} className={layoutClasses.fullHeight}>
        <Grid item xs={12} sm={7}>
          <Box className={classes.responsiveLineWrapper}>
            <ResponsiveLine
              margin={{ top: 4, bottom: 4, left: 4 }}
              animate
              enableSlices="x"
              enableArea
              curve="natural"
              colors={{ scheme: "set2" }}
              data={data}
              lineWidth={1}
              defs={[
                linearGradientDef("gradientA", [
                  { offset: 0, color: "inherit" },
                  { offset: 100, color: "inherit", opacity: 0 },
                ]),
              ]}
              layers={["areas", "crosshair", "lines", "slices"]}
              fill={[{ match: "*", id: "gradientA" }]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} className={layoutClasses.fullHeight}>
          <Grid container className={layoutClasses.fullHeight}>
            <Box width={1}>
              <Typography variant="body2" className={layoutClasses.mb1}>
                Prairie Score
              </Typography>
              <Box width={1} display="flex">
                <Typography variant="h2">{lastScoreItem.score}</Typography>
                <Typography
                  variant="h2"
                  className={colorClasses.secondaryGreen1}
                >
                  {` (${lastScoreItem.score - firstScoreItem.score})`}
                </Typography>
              </Box>
              <Typography variant="body2" className={layoutClasses.mb15}>
                {formatFullDay(lastScoreItem.date)}
              </Typography>
            </Box>

            <EditButton title="View my progress" />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieScore;