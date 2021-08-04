import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";

import { EditButton } from "../Button";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../useCommonStyles";

const SurveyProgress = () => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <AssessmentOutlinedIcon
          className={clsx(colorClasses.secondaryGreen1, layoutClasses.mb1)}
        />
        <Typography variant="subtitle2" className={layoutClasses.mb05}>
          It&apos;s been
          <b> 4 weeks </b>
          since your last check-in.
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <EditButton title="Take the survey" />
      </CardActions>
    </Card>
  );
};

export default SurveyProgress;
