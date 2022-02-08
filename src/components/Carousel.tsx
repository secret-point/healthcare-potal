import clsx from "clsx";
import MCarousel, {
  CarouselProps as MCarouselProps,
} from "react-multi-carousel";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";

import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";
import { useLayoutStyles } from "./useCommonStyles";
import ArrowButtonGroup from "./ArrowButtonGroup";

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
        minHeight: theme.spacing(5),
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
  })
);

interface CarouselProps extends MCarouselProps {
  title: string;
  itemCount: number;
}

const Carousel: React.FC<CarouselProps> = ({
  title,
  children,
  responsive,
  itemCount,
  itemClass,
  containerClass,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const { deviceType, isMobile } = useViewport();

  return (
    <div className={classes.container}>
      <Typography className={classes.carouselTitle} variant="h2">
        {title}
        <Badge
          badgeContent={itemCount}
          color="error"
          className={layoutClasses.ml2}
        />
      </Typography>
      <MCarousel
        partialVisible={isMobile}
        arrows={false}
        deviceType={deviceType}
        itemClass={clsx(classes.item, itemClass)}
        containerClass={clsx(classes.carousel, containerClass)}
        responsive={responsive}
        customButtonGroup={<ArrowButtonGroup />}
      >
        {children}
      </MCarousel>
      {!itemCount && (
        <Typography variant="subtitle2" className={layoutClasses.ml15}>
          You have no outstanding to-do items.
        </Typography>
      )}
    </div>
  );
};

export default Carousel;
