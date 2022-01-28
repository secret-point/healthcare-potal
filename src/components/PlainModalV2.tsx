import { FC, SVGProps } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core";

import { ReactComponent as PrairieIcon } from "../assets/PrairieIcon.svg";
import { useViewport } from "../hooks/useViewport";

interface PlainModalV2Props {
  background?: string;
  CoverIcon?: FC<SVGProps<SVGSVGElement> & { title?: string }>;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    desktopContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: "center",
    },
    mobileContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    desktopIcon: {
      marginBottom: theme.spacing(5),
    },
    mobileIcon: {
      marginBottom: theme.spacing(3),
    },
    desktopView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing(10),
    },
    mobileView: {
      display: "flex",
      flexDirection: "column",
    },
    desktopChildren: {
      width: 432,
      minWidth: 432,
      background: (props: PlainModalV2Props) =>
        props.background || "transparent",
      padding: theme.spacing(0),
      borderRadius: theme.spacing(2),
    },
    mobileChildren: {
      width: "100%",
      background: "transparent",
      padding: 0,
    },
  })
);

const PlainModalV2: FC<PlainModalV2Props> = ({
  background,
  CoverIcon,
  children,
}) => {
  const classes = useStyles({ background });
  const { isMobile } = useViewport();

  return (
    <Box
      className={isMobile ? classes.mobileContainer : classes.desktopContainer}
    >
      {isMobile && <PrairieIcon className={classes.mobileIcon} />}

      <Box className={isMobile ? classes.mobileView : classes.desktopView}>
        {CoverIcon ? <CoverIcon width="100%" /> : null}

        <Box
          className={
            isMobile ? classes.mobileChildren : classes.desktopChildren
          }
        >
          {!isMobile && <PrairieIcon className={classes.desktopIcon} />}

          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default PlainModalV2;
