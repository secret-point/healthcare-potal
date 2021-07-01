import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core";

import { useViewport } from "../hooks/useViewport";

const useStyles = makeStyles((theme) =>
  createStyles({
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

const PlainModal: React.FC = ({ children }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();

  return (
    <Box className={isMobile ? classes.mobile : classes.main}>{children}</Box>
  );
};

export default PlainModal;
