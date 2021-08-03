import { FC, useMemo } from "react";
import { SeverityTypes } from "../../../types";
import { Theme } from "../../../theme/types/createPalette";
import { useTheme } from "@material-ui/core";

interface PrairieStatusProps {
  current: SeverityTypes;
}

const PrairieStatus: FC<PrairieStatusProps> = ({ current }) => {
  const theme = useTheme<Theme>();

  const color = useMemo(() => {
    switch (current) {
      case SeverityTypes.SEVERE:
        return theme.palette.accentRed.main;
      case SeverityTypes.MODERATE_SEVERE:
        return "#E5652E";
      case SeverityTypes.MODERATE:
        return "#EAB01A";
      case SeverityTypes.MILD:
        return theme.palette.primaryGreen.main;
      case SeverityTypes.REMISSION:
        return theme.palette.secondaryGreen1.main;
      default:
        return theme.palette.accentRed.main;
    }
  }, [current, theme]);

  return (
    <div
      style={{
        color,
        border: `1px solid ${color}`,
        padding: theme.spacing(0.5, 1.5),
        borderRadius: theme.spacing(2),
      }}
    >
      {current}
    </div>
  );
};

export default PrairieStatus;
