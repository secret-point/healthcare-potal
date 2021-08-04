import clsx from "clsx";
import { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useViewport } from "../hooks/useViewport";
import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonGroup: {
      display: "flex",
      gap: theme.spacing(3),
    },
    arrowButton: {
      color: "white",
      backgroundColor: theme.palette.secondaryGreen1.main,

      "&:hover": {
        backgroundColor: theme.palette.secondaryGreen2.main,
      },

      "&.Mui-disabled": {
        color: "white",
        backgroundColor: theme.palette.disabled.main,
      },
    },
  })
);

interface ButtonGroupProps {
  disabledNext?: boolean;
  disabledPrevious?: boolean;
  onClickNext?: VoidFunction;
  onClickPrevious?: VoidFunction;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({
  disabledNext,
  disabledPrevious,
  onClickNext,
  onClickPrevious,
}) => {
  const classes = useStyles();
  return (
    <div className={clsx("ButtonGroup", classes.buttonGroup)}>
      <IconButton
        className={classes.arrowButton}
        disabled={disabledPrevious}
        onClick={onClickPrevious}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        className={classes.arrowButton}
        disabled={disabledNext}
        onClick={onClickNext}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};

interface ArrowButtonGroupProps {
  next?: VoidFunction;
  previous?: VoidFunction;
  carouselState?: any;
}

const ArrowButtonGroup: FC<ArrowButtonGroupProps> = ({
  next,
  previous,
  carouselState,
}) => {
  const { isMobile } = useViewport();
  const { totalItems, currentSlide, slidesToShow } = carouselState;

  if (isMobile) return <div className="ButtonGroup" />;

  return (
    <ButtonGroup
      disabledNext={currentSlide + slidesToShow >= totalItems}
      disabledPrevious={!currentSlide}
      onClickNext={next}
      onClickPrevious={previous}
    />
  );
};

export default ArrowButtonGroup;
