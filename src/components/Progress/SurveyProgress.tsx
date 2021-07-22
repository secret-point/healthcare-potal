import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { EditButton } from "../Button";
import { useCardStyles, useLayoutStyles } from "../useCommonStyles";

const SurveyProgress = () => {
  const cardClasses = useCardStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <img
          width={40}
          height={40}
          alt="User Profile"
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
          className={layoutClasses.mb2}
        />
        <Typography variant="body2" className={layoutClasses.mb05}>
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
