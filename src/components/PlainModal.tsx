import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      width: 560,
      background: "white",
      padding: theme.spacing(6, 8),
      borderRadius: theme.spacing(2),
    },
  })
);

const PlainModal: React.FC = ({ children }) => {
  const classes = useStyles();
  return <Box className={classes.main}>{children}</Box>;
};

export default PlainModal;
