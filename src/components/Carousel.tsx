import clsx from "clsx";
import MCarousel, {
  CarouselProps as MCarouselProps,
} from "react-multi-carousel";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useViewport } from "../hooks/useViewport";
import { Theme } from "../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "100%",
      position: "relative",
    },
    carousel: {
      width: "100%",

      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-start",

      "& .ButtonGroup": {
        alignSelf: "flex-end",
        display: "flex",
        gap: theme.spacing(3),
        paddingRight: theme.spacing(1.5),
        marginBottom: theme.spacing(2),
      },
    },
    carouselTitle: {
      position: "absolute",
      left: theme.spacing(1.5),
      top: theme.spacing(2),
    },
    item: {
      padding: theme.spacing(0, 1.5),
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

interface CustomButtonGroupProps {
  next?: VoidFunction;
  previous?: VoidFunction;
  carouselState?: any;
}

const CustomButtonGroup = ({
  next,
  previous,
  carouselState,
}: CustomButtonGroupProps) => {
  const classes = useStyles();
  const { totalItems, currentSlide, slidesToShow } = carouselState;

  return (
    <div className="ButtonGroup">
      <IconButton
        className={classes.arrowButton}
        disabled={!currentSlide}
        onClick={previous}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        className={classes.arrowButton}
        disabled={currentSlide + slidesToShow >= totalItems}
        onClick={next}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  );
};

interface CarouselProps extends MCarouselProps {
  title: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  title,
  responsive,
  itemClass,
  containerClass,
}) => {
  const classes = useStyles();
  const { deviceType } = useViewport();

  return (
    <div className={classes.container}>
      <Typography className={classes.carouselTitle} variant="h2">
        {title}
      </Typography>
      <MCarousel
        arrows={false}
        deviceType={deviceType}
        itemClass={clsx(classes.item, itemClass)}
        containerClass={clsx(classes.carousel, containerClass)}
        responsive={responsive}
        customButtonGroup={<CustomButtonGroup />}
      >
        {children}
      </MCarousel>
    </div>
  );
};

export default Carousel;
