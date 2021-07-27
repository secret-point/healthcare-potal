import clsx from "clsx";
import MCarousel, {
  CarouselProps as MCarouselProps,
} from "react-multi-carousel";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useViewport } from "../hooks/useViewport";
import { Theme } from "../theme/types/createPalette";
import { useLayoutStyles } from "./useCommonStyles";

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
        minHeight: 40,
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
  const { isMobile } = useViewport();
  const { totalItems, currentSlide, slidesToShow } = carouselState;

  if (isMobile) return <div className="ButtonGroup" />;

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
  itemCount: number;
  missingCount: number;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  children,
  responsive,
  itemCount,
  itemClass,
  missingCount,
  containerClass,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const { deviceType } = useViewport();

  return (
    <div className={classes.container}>
      <Typography className={classes.carouselTitle} variant="h2">
        {title}
        <Badge
          badgeContent={missingCount}
          color="error"
          className={layoutClasses.ml2}
        />
      </Typography>
      <MCarousel
        partialVisible
        arrows={false}
        deviceType={deviceType}
        itemClass={clsx(classes.item, itemClass)}
        containerClass={clsx(classes.carousel, containerClass)}
        responsive={responsive}
        customButtonGroup={<CustomButtonGroup />}
      >
        {children}
      </MCarousel>
      {!itemCount && (
        <Typography className={layoutClasses.ml15}>
          You have no outstanding to-do items.
        </Typography>
      )}
    </div>
  );
};

export default Carousel;
