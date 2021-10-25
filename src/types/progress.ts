import { SeverityTypes } from "./general";

export type TProgressRequest = {
  memberID: string;
  PHQ1: number;
  PHQ2: number;
  PHQ3: number;
  PHQ4: number;
  PHQ5: number;
  PHQ6: number;
  PHQ7: number;
  PHQ8: number;
  PHQ9: number;
  GAD1: number;
  GAD2: number;
  GAD3: number;
  GAD4: number;
  GAD5: number;
  GAD6: number;
  GAD7: number;
  comment: string;
  sideEffect: string;
  CSAT: number;
  markAsRead: boolean;
  archived: boolean;
  deltaTotal: Nullable<number>;
  triggerByRequest: boolean;
  deltaTotalPHQ: Nullable<number>;
  deltaTotalGAD: Nullable<number>;
};

export type TProgress = TProgressRequest & {
  totalPHQ: number;
  totalGAD: number;
  total: number;
  updatedAt: string;
  // TODO: move this onto the schema
  severity: SeverityTypes;
  // symptoms: string[];
};

export type TCheckInFormRequest = any;

export type TInTakeFormRequest = any;

export type TFeedbackRequest = any;
