import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TScoreItem } from "../../../types";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";
import PrairieStatus from "./PrairieStatus";
import { ButtonGroup } from "../../../components/ArrowButtonGroup";

const useStyles = makeStyles(() =>
  createStyles({
    buttonGroupWrapper: {
      marginTop: "auto",
    },
  })
);

interface PrairieStatusCardProps {
  previousScore?: TScoreItem;
  currentScore: TScoreItem;
  disabledNext: boolean;
  disabledPrevious: boolean;
  onClickNext: VoidFunction;
  onClickPrevious: VoidFunction;
}

const PrairieStatusCard: FC<PrairieStatusCardProps> = ({
  previousScore,
  currentScore,
  disabledNext,
  disabledPrevious,
  onClickNext,
  onClickPrevious,
}) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const scoreDifference = currentScore.score - (previousScore?.score || 0);

  return (
    <Card variant="outlined" className={clsx(cardClasses.card)}>
      <Grid container className={clsx(layoutClasses.fullHeight)}>
        <Grid item xs={12}>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="h3">
              {dayjs(currentScore.date).format("MMM D, YYYY")}
            </Typography>
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="subtitle2" className={layoutClasses.mb05}>
              PrairieScore
            </Typography>

            <Box width={1} display="flex" alignItems="flex-end">
              <Typography variant="h2">{currentScore.score}</Typography>
              <Typography
                variant="subtitle1"
                className={clsx(
                  colorClasses.secondaryGreen1,
                  layoutClasses.ml1
                )}
              >
                {`(${scoreDifference})`}
              </Typography>
            </Box>
          </Grid>

          <Grid container className={layoutClasses.mb2}>
            <Grid item xs={12} className={layoutClasses.mb1}>
              <Typography variant="subtitle2">Severity</Typography>
            </Grid>
            <PrairieStatus current={currentScore.severity} />
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="subtitle2">Symptoms</Typography>
            <Typography variant="subtitle1">
              {currentScore.symptoms.join(", ") || "None reported"}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.buttonGroupWrapper}>
          <ButtonGroup
            disabledNext={disabledNext}
            disabledPrevious={disabledPrevious}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieStatusCard;
