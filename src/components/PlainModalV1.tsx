import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core";

import { ReactComponent as PrairieIcon } from "src/assets/PrairieIcon.svg";
import { useViewport } from "src/hooks/useViewport";

const useStyles = makeStyles((theme) =>
  createStyles({
    modalWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    icon: {
      marginBottom: theme.spacing(9),
    },
    main: {
      width: 560,
      background: "white",
      padding: theme.spacing(6, 8),
      borderRadius: theme.spacing(2),
    },
    mobile: {
      width: "100%",
      background: "transparent",
      padding: 0,
    },
  })
);

const PlainModalV1: React.FC = ({ children }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();

  return (
    <Box className={classes.modalWrapper}>
      <PrairieIcon className={classes.icon} />
      <Box className={isMobile ? classes.mobile : classes.main}>{children}</Box>
    </Box>
  );
};

export default PlainModalV1;
