import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { EditButton } from "../Button";
import { useCardStyles, useLayoutStyles } from "../useCommonStyles";

const SymptomsReport = () => {
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
