import { FC, useState } from "react";
import { TScoreHistory } from "../../../types";
import PriaireStatusCard from "./PrairieStatusCard";

interface PrairieStatusCardSlicesProps {
  scores: TScoreHistory;
}

const PrairieStatusCardSlices: FC<PrairieStatusCardSlicesProps> = ({
  scores,
}) => {
  const [index, setIndex] = useState(0);
  const disabledNext = index + 1 >= scores.length;
  const disabledPrevious = index < 1;

  const handleClickNext = () => {
    if (disabledNext) return;
    setIndex(index + 1);
  };

  const handleClickPrevious = () => {
    if (disabledPrevious) return;
    setIndex(index - 1);
  };

  return (
    <PriaireStatusCard
      previousScore={scores[index - 1]}
      currentScore={scores[index]}
      disabledNext={disabledNext}
      disabledPrevious={disabledPrevious}
      onClickNext={handleClickNext}
      onClickPrevious={handleClickPrevious}
    />
  );
};

export default PrairieStatusCardSlices;
