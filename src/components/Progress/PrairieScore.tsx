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

import { ButtonLink } from "../Link";
import { TProgress } from "../../types";
import { formatFullDay } from "../../utils/date";
import {
  useCardStyles,
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "../useCommonStyles";
import { ROUTES } from "../../app/types";

const useStyles = makeStyles(() =>
  createStyles({
    responsiveLineWrapper: {
      height: 180,
      maxWidth: 300,
    },
    viewMyProgress: {
      alignSelf: "flex-end !important",
    },
  })
);

interface PrairieScoreProps {
  progressList: TProgress[];
}

const PrairieScore = ({ progressList }: PrairieScoreProps) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const data = useMemo(() => {
    if (!progressList.length) return { id: "PrairieScore", data: [] };
    const firstDate = progressList[0].updatedAt;
    return [
      {
        id: "PrairieScore",
        data: progressList.map((history) => ({
          x: dayjs(firstDate).diff(history.updatedAt, "day"),
          y: history.total || 0,
        })),
      },
    ] as any;
  }, [progressList]);

  if (!progressList.length) return null;
  const firstScoreItem = progressList[0];
  const lastScoreItem = progressList[progressList.length - 1];

  return (
    <Card
      variant="outlined"
      className={clsx(
        cardClasses.card,
        cardClasses.grayBorder,
        layoutClasses.pb0,
        layoutClasses.pt4
      )}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <Box className={classes.responsiveLineWrapper}>
            <ResponsiveLine
              margin={{ top: 4, bottom: 4, left: 4 }}
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
        <Grid item xs={12} sm={5}>
          <Grid container className={layoutClasses.fullHeight}>
            <Box width={1}>
              <Typography variant="subtitle2" className={layoutClasses.mb1}>
                Prairie Score
              </Typography>
              <Box width={1} display="flex">
                <Typography variant="h2">
                  {lastScoreItem.total}
                  &nbsp;
                </Typography>
                <Typography
                  variant="h2"
                  className={clsx(
                    colorClasses.secondaryGreen1,
                    fontClasses.fontNormal
                  )}
                >
                  {`(${lastScoreItem.total - firstScoreItem.total})`}
                </Typography>
              </Box>
              <Typography variant="subtitle2" className={layoutClasses.mb15}>
                {formatFullDay(lastScoreItem.updatedAt)}
              </Typography>
            </Box>

            <ButtonLink
              text="View my progress"
              to={ROUTES.PROGRESS}
              align="left"
              className={classes.viewMyProgress}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieScore;
