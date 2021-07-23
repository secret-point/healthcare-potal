import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { EditButton } from "../Button";
import { ScoreHistory } from "../../types/general";
import { formatFullDay } from "../../utils/date";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../useCommonStyles";

interface PrairieScoreProps {
  scoreHistory: ScoreHistory;
}

const PrairieScore = ({ scoreHistory }: PrairieScoreProps) => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <Grid container className={layoutClasses.fullHeight}>
        <Grid item xs={7}>
          <svg
            width="264"
            height="122"
            viewBox="0 0 264 122"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M134.5 36.9978C87.7 5.05646 25.3333 -0.907264 0 0.103537V122H264V84C240.333 81.6415 181.3 68.9391 134.5 36.9978Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="132"
                y1="0"
                x2="132"
                y2="122"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#A3D9CF" stopOpacity="0.5" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="body2" className={layoutClasses.mb1}>
            Prairie Score
          </Typography>
          <Box width={1} display="flex">
            <Typography variant="h2">23</Typography>
            <Typography variant="h2" className={colorClasses.secondaryGreen1}>
              {` (${scoreHistory.currentScore - scoreHistory.previousScore})`}
            </Typography>
          </Box>
          <Typography variant="body2" className={layoutClasses.mb15}>
            {formatFullDay(scoreHistory.date)}
          </Typography>

          <EditButton title="View my progress" />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieScore;
