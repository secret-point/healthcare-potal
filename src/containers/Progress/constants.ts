import { SeverityTypes, TScoreHistory } from "../../types";

export const MAX_PRAIRIE_SCORE = 48;

export const mockScoreHistory: TScoreHistory = [
  {
    date: new Date(2021, 0, 25),
    score: 42,
    severity: SeverityTypes.MODERATE,
    symptoms: [
      "Headache",
      "Nausea or dizziness",
      "Weight gain",
      "Sexual Problems",
    ],
  },
  {
    date: new Date(2021, 1, 20),
    score: 41,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 1, 25),
    score: 40,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 1, 28),
    score: 38,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 2, 4),
    score: 35,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 3, 25),
    score: 24,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 4, 10),
    score: 20,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
  {
    date: new Date(2021, 5, 25),
    score: 15,
    severity: SeverityTypes.MODERATE,
    symptoms: [],
  },
];
