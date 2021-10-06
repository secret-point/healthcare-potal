import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ButtonLink } from "./Link";
import { useLayoutStyles } from "./useCommonStyles";
import { ROUTES } from "../app/types";

const useStyles = makeStyles((theme) =>
  createStyles({
    teamMemberCard: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(3),

      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  })
);

const EmptyCareTeamMemberCard = () => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles()();

  return (
    <Card variant="outlined" className={classes.teamMemberCard}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <Typography variant="subtitle1" className={layoutClasses.mb3}>
          We can coordinate care with your other providers, such as PCPs and
          therapists.
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <ButtonLink
          text="Set up care coordination"
          to={ROUTES.CARE_COORDINATION}
        />
      </CardActions>
    </Card>
  );
};

export default EmptyCareTeamMemberCard;
