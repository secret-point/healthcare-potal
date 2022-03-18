import clsx from "clsx";
import { FC, ReactNode } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useLayoutStyles } from "src/components/useCommonStyles";
import { Theme } from "src/theme/types/createPalette";
import { PRESCRIPTION_DELIVERY_OPTIONS } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      background: "white",
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
      cursor: "pointer",
      padding: theme.spacing(3),
      position: "relative",
    },

    selectedCard: {
      border: `1px solid ${theme.palette.secondaryGreen1.main}`,
    },

    recommendedBadge: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(3),
      letterSpacing: "1px",
      fontWeight: 700,
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface DeliveryCardProps {
  icon: ReactNode;
  isRecommended?: boolean;
  instructions: string[];
  title: string;
  isSelected?: boolean;
  option: PRESCRIPTION_DELIVERY_OPTIONS;
  onSelect: (option: PRESCRIPTION_DELIVERY_OPTIONS) => void;
}

const DeliveryCard: FC<DeliveryCardProps> = ({
  icon,
  isRecommended,
  instructions,
  isSelected,
  title,
  option,
  onSelect,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  const handleSelect = () => {
    onSelect(option);
  };

  return (
    <Grid
      container
      className={clsx(classes.card, isSelected && classes.selectedCard)}
      onClick={handleSelect}
    >
      {isRecommended && (
        <Typography variant="body1" className={classes.recommendedBadge}>
          RECOMMENDED
        </Typography>
      )}

      <Grid item xs={12} className={layoutClasses.mb1}>
        {icon}
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb1}>
        <Typography variant="h5">{title}</Typography>
      </Grid>

      {instructions.map((instruction, index) => (
        <Grid item xs={12} key={index}>
          <Typography variant="subtitle1">{instruction}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default DeliveryCard;
