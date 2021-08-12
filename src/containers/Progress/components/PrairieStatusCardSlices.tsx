import { FC } from "react";
import { TScoreHistory } from "../../../types";
import PriaireStatusCard from "./PrairieStatusCard";

interface PrairieStatusCardSlicesProps {
  active: number;
  scores: TScoreHistory;
  onUpdateActive: (active: number) => void;
}

const PrairieStatusCardSlices: FC<PrairieStatusCardSlicesProps> = ({
  active,
  scores,
  onUpdateActive,
}) => {
  const disabledNext = active + 1 >= scores.length;
  const disabledPrevious = active < 1;

  const handleClickNext = () => {
    if (disabledNext) return;
    onUpdateActive(active + 1);
  };

  const handleClickPrevious = () => {
    if (disabledPrevious) return;
    onUpdateActive(active - 1);
  };

  return (
    <PriaireStatusCard
      previousScore={scores[active - 1]}
      currentScore={scores[active]}
      disabledNext={disabledNext}
      disabledPrevious={disabledPrevious}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
    />
  );
};

export default PrairieStatusCardSlices;
