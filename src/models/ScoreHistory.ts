import { ProgressTypes, TScoreHistory, TProgressSummary } from "../types";

export class ScoreHistory {
  history: TScoreHistory;
  progressType: ProgressTypes;

  constructor(history: TScoreHistory) {
    this.history = history;
  }

  public determineProgressType(): ProgressTypes {
    this.progressType = ProgressTypes.CASE_1_1_1;
    return this.progressType;
  }

  public getSummary(): TProgressSummary {
    this.determineProgressType();

    switch (this.progressType) {
      case ProgressTypes.CASE_1_1_1:
        return {
          title: "You're making great strides! 🎉",
          summary:
            "It’s very common for scores to not change as much before you start seeing improvments. Let’s check-in by taking the survey next week to continue monitoring your wellbeing.",
        };
      case ProgressTypes.CASE_1_1_2:
        return {
          title: "Your care team is reviewing your progress. 📋️",
          summary:
            "Hmm.... It seems like your score has been inreasing over the past {x} weeks. Your care team will review your progress and reach out to you if we need to make any adjustments to your treatment plan.",
        };
      case ProgressTypes.CASE_1_2_1:
        return {
          title: "You’re making great progress! 🎉",
          summary:
            "Your score <b>decreased by 3 points</b> since May 25, 2021. This lets us know that you’ve been experienceing less symptoms related to anxiety and depression.",
        };
      case ProgressTypes.CASE_1_2_2:
        return {
          title: "You’re getting better {x} weeks in a row! 🎉",
          summary:
            "Congratulations - we’re so happy for you! Your score has <b>decreased by {n}</b> points over the past {x} weeks. Constant progress like this mean you’re on your way to feeling much better!",
        };
      case ProgressTypes.CASE_1_3_1:
        return {
          title: "Don’t worry about your score going up!🥰💕",
          summary:
            "Always remember - mental health journey has its own ebbs and flows. While your score increased slightly, we’ll be watching out for your progress so that you don’t have to worry about it. We’re always here for you!",
        };
      case ProgressTypes.CASE_1_3_2:
        return {
          title: "Your care team is reviewing your progress. 📋️",
          summary:
            "Hmm.... It seems like your score has been inreasing over the past {x} weeks. Your care team will review your progress and reach out to you if we need to make any adjustments to your treatment plan.",
        };
      case ProgressTypes.CASE_2_1:
        return {
          title: "You’re doing great, as always! 🎉",
          summary:
            "It seems like you’ve been stable with minimum symptoms of anxiety and depression. We’re so happy for you! Feel free to reach out to your Prairie care team when you ",
        };
      case ProgressTypes.CASE_2_2:
        return {
          title: "You’re doing even better! 🎉",
          summary:
            "We have two great news - you have minimum symptoms of anxiety and depression, and your mental health is continuing to improve! We would say that calls for a celebration.",
        };
      case ProgressTypes.CASE_2_3:
        return {
          title: "You’re doing well - nothing to worry about! 🎉",
          summary:
            "While your score increased slightly, you still have minimum symptoms of anxiety and depression. We’ll keep an eye on your progress, but there’s nothing to be worried about!",
        };
      default:
        return {
          title: "You're making great strides! 🎉",
          summary:
            "It’s very common for scores to not change as much before you start seeing improvments. Let’s check-in by taking the survey next week to continue monitoring your wellbeing.",
        };
    }
  }
}
