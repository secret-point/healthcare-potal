import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

import { EditButton } from "../Button";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../useCommonStyles";

const SymptomsReport = () => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={cardClasses.card}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <EmojiPeopleIcon
          className={clsx(colorClasses.secondaryGreen1, layoutClasses.mb1)}
        />
        <Typography variant="subtitle2" className={layoutClasses.mb05}>
          Not feeling too well? Let your care team know.
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <EditButton title="Report your symptoms" />
      </CardActions>
    </Card>
  );
};

export default SymptomsReport;
