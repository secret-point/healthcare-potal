import { TDropItem, TQuestion } from "src/types";

export enum AssessmentSurveySteps {
  WELCOME = "WELCOME",
  QUESTIONS = "QUESTIONS",
  DOB_CHECKER = "DOB_CHECKER",
  COMPLETE = "COMPLETE",
}

export const FREQUENCY_OPTIONS: TDropItem[] = [
  { value: 3, code: "EVERYDAY", display: "Nearly every day" },
  { value: 2, code: "MORETHANHALFDAYS", display: "More than half of the days" },
  { value: 1, code: "SEVERALDAYS", display: "Several days" },
  { value: 0, code: "NOTATALL", display: "Not at all" },
];

export const frequencyOptionCodeToValue = (code: string) =>
  FREQUENCY_OPTIONS.find((option) => option.code === code)?.value || 0;

export const SIDE_EFFECTS: TDropItem[] = [
  { code: "MCQ_HEADACHE", display: "Headache" },
  { code: "MCQ_SLEEPING", display: "Trouble Sleeping" },
  { code: "MCQ_DIZZINESS", display: "Nausea or dizziness" },
  { code: "MCQ_CONSTIPATION", display: "Diarrhea or constipation" },
  { code: "MCQ_SEXUAL", display: "Sexual Problems" },
  { code: "MCQ_FATIGUE", display: "Weakness or fatigue" },
  { code: "MCQ_WEIGHTGAIN", display: "Weight Gain" },
];

const GAD_PHQ_COMMON_HEADER =
  "Over the past 2 weeks, how often have you experienced the following:";

export const CHECKIN_QUESTIONS: TQuestion[] = [
  {
    type: "GAD",
    code: "GAD1",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling nervous, anxious or on edge.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD2",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Not being able to stop or control worrying.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD3",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Worrying too much about different things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD4",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble relaxing.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD5",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Being so restless that it's hard to sit still.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD6",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Becoming easily annoyed or irritable.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD7",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling afraid as if something awful might happen.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ1",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Little interest or pleasure in doing things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ2",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling down, depressed, or hopeless.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ3",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble falling or staying asleep, or sleeping too much.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ4",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling tired or having little energy.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ5",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Poor appetite or overeating.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ6",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling bad about yourself.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ7",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble concentrating on things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ8",
    header: GAD_PHQ_COMMON_HEADER,
    question:
      "Moving/speaking slowly that other people have noticed, or being fidgety or restless.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ9",
    header: GAD_PHQ_COMMON_HEADER,
    question:
      "Thoughts that you’d be better off dead or of hurting yourself in some way.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "MCQ",
    code: "sideEffects",
    question:
      "Are you experiencing any side effects? Please select all that apply.",
    options: SIDE_EFFECTS,
  },
  {
    type: "FRQ",
    code: "comment",
    header:
      "Is there anything else you want your doctor to know? Your doctor and your care coordinator will review your response and get back to you, if necessary.",
    question: "",
  },
];
