import clsx from "clsx";
import { FC } from "react";
import dayjs from "dayjs";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";

import { ROUTES } from "../../app/types";
import { ButtonLink } from "../Link";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../useCommonStyles";
import { TProgress } from "../../types";

interface SurveyProgressProps {
  lastProgress: TProgress;
}

const SurveyProgress: FC<SurveyProgressProps> = ({ lastProgress }) => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const diffInWeeks = dayjs().diff(lastProgress.updatedAt, "weeks");

  if (diffInWeeks < 2) return null;

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, cardClasses.grayBorder)}
    >
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <AssessmentOutlinedIcon
          className={clsx(colorClasses.secondaryGreen1, layoutClasses.mb1)}
        />
        <Typography variant="subtitle1" className={layoutClasses.mb05}>
          <span
            dangerouslySetInnerHTML={{
              __html: `It's been <b>${diffInWeeks} weeks</b> since your last check-in`,
            }}
          />
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <ButtonLink text="Take the survey" to={ROUTES.CHECKIN} align="left" />
      </CardActions>
    </Card>
  );
};

export default SurveyProgress;
