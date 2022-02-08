import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

import { ROUTES } from "src/app/types";

import { ButtonLink } from "src/components/Link";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";

const SymptomsReport = () => {
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, cardClasses.grayBorder)}
    >
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <EmojiPeopleIcon
          className={clsx(colorClasses.secondaryGreen1, layoutClasses.mb1)}
        />
        <Typography variant="subtitle1" className={layoutClasses.mb05}>
          Not feeling too well? Let your care team know.
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <ButtonLink
          text="Report your symptoms"
          to={ROUTES.ASSESSMENT}
          align="left"
        />
      </CardActions>
    </Card>
  );
};

export default SymptomsReport;
