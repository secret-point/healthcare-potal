import { SeverityTypes } from "src/types";

export const MAX_PRAIRIE_SCORE = 48;

export const prairieScoreDefs = [
  { type: SeverityTypes.REMISSION, range: { min: 0, max: 10 } },
  { type: SeverityTypes.MILD, range: { min: 11, max: 20 } },
  { type: SeverityTypes.MODERATE, range: { min: 21, max: 27 } },
  { type: SeverityTypes.MODERATE_SEVERE, range: { min: 28, max: 35 } },
  { type: SeverityTypes.SEVERE, range: { min: 36, max: 48 } },
];
