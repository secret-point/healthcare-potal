import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FC } from "react";

import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";

interface StyleProps {
  isMobile: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.spacing(1.5, 1),
    },
    chip: {
      color: theme.palette.secondaryNavy1.main,
      background: theme.palette.backgroundGray.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),

      height: ({ isMobile }: StyleProps) => (isMobile ? 20 : 32),

      "& .MuiChip-label": {
        padding: ({ isMobile }: StyleProps) =>
          isMobile ? theme.spacing(0, 0.75) : theme.spacing(0, 1.5),
      },
    },
  })
);

interface ChipsListProps {
  chips: string[];
}

const ChipsList: FC<ChipsListProps> = ({ chips }) => {
  const { isMobile } = useViewport();
  const classes = useStyles({ isMobile });

  return (
    <Box className={classes.container}>
      {chips.map((label) => (
        <Chip key={label} label={label} className={classes.chip} />
      ))}
    </Box>
  );
};

export default ChipsList;
