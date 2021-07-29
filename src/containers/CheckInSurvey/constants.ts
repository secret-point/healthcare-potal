import { TLabelCode, TQuestion } from "../../types";

export enum CheckInSurveySteps {
  WELCOME = "WELCOME",
  QUESTIONS = "QUESTIONS",
  COMPLETE = "COMPLETE",
}

export const FREQUENCY_OPTIONS: TLabelCode[] = [
  { code: "EVERYDAY", label: "Nearly every day" },
  { code: "MORETHANHALFDAYS", label: "More than half of the days" },
  { code: "SEVERALDAYS", label: "Several days" },
  { code: "NOTATALL", label: "Not at all" },
];

export const SIDE_EFFECTS: TLabelCode[] = [
  { code: "MCQ_HEADACHE", label: "Headache" },
  { code: "MCQ_SLEEPING", label: "Trouble Sleeping" },
  { code: "MCQ_DIZZINESS", label: "Nausea or dizziness" },
  { code: "MCQ_CONSTIPATION", label: "Diarrhea or constipation" },
  { code: "MCQ_SEXUAL", label: "Sexual Problems" },
  { code: "MCQ_FATIGUE", label: "Weakness or fatigue" },
  { code: "MCQ_WEIGHTGAIN", label: "Weight Gain" },
];

const GAD_PHQ_COMMON_HEADER =
  "Over the past 2 weeks, how often have you experienced the following:";

export const QUESTIONS: TQuestion[] = [
  {
    type: "GAD",
    code: "GAD_QUESTION_1",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling nervous, anxious or on edge.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_2",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Not being able to stop or control worrying.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_3",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Worrying too much about different things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_4",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble relaxing.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_5",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Being so restless that it's hard to sit still.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_6",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Becoming easily annoyed or irritable.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "GAD",
    code: "GAD_QUESTION_7",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling afraid as if something awful might happen.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_1",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Little interest or pleasure in doing things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_2",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling down, depressed, or hopeless.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_3",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble falling or staying asleep, or sleeping too much.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_4",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling tired or having little energy.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_5",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Poor appetite or overeating.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_6",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Feeling bad about yourself.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_7",
    header: GAD_PHQ_COMMON_HEADER,
    question: "Trouble concentrating on things.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_8",
    header: GAD_PHQ_COMMON_HEADER,
    question:
      "Moving/speaking slowly that other people have noticed, or being fidgety or restless.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "PHQ",
    code: "PHQ_QUESTION_9",
    header: GAD_PHQ_COMMON_HEADER,
    question:
      "Thoughts that you’d be better off dead or of hurting yourself in some way.",
    options: FREQUENCY_OPTIONS,
  },
  {
    type: "MCQ",
    code: "MCQ_QUESTION",
    question:
      "Are you experiencing any side effects? Please select all that apply.",
    options: SIDE_EFFECTS,
  },
];
