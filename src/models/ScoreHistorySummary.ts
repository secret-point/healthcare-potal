import dayjs from "dayjs";
import { ProgressTypes, TProgress, TProgressSummary } from "src/types";

const SCORE_DELTA = 3;

export class ScoreHistorySummary {
  history: TProgress[];

  constructor(history: TProgress[]) {
    this.history = history;
  }

  private determineProgressType(): ProgressTypes {
    if (!this.history.length) {
      return ProgressTypes.NO_CASE;
    }
    const lastHistory = this.history[this.history.length - 1];

    if (lastHistory.total <= 10) {
      const last2ndHistory = this.history[this.history.length - 2];
      if (!last2ndHistory) {
        return ProgressTypes.CASE_2_1;
      }
      if (last2ndHistory.total - lastHistory.total > SCORE_DELTA) {
        return ProgressTypes.CASE_2_2;
      }
      if (lastHistory.total - last2ndHistory.total > SCORE_DELTA) {
        return ProgressTypes.CASE_2_3;
      }
      return ProgressTypes.CASE_2_1;
    }

    const last2ndHistory = this.history[this.history.length - 2];
    if (!last2ndHistory) {
      return ProgressTypes.CASE_1_1_1;
    }

    if (last2ndHistory.total - lastHistory.total > SCORE_DELTA) {
      const last3rdHistory = this.history[this.history.length - 3];
      if (
        last3rdHistory &&
        last3rdHistory.total - last2ndHistory.total > SCORE_DELTA
      ) {
        return ProgressTypes.CASE_1_2_2;
      }
      return ProgressTypes.CASE_1_2_1;
    }

    if (lastHistory.total - last2ndHistory.total > SCORE_DELTA) {
      const last3rdHistory = this.history[this.history.length - 3];
      if (
        last3rdHistory &&
        last2ndHistory.total - last3rdHistory.total > SCORE_DELTA
      ) {
        return ProgressTypes.CASE_1_3_2;
      }
      return ProgressTypes.CASE_1_3_1;
    }

    const last3rdHistory = this.history[this.history.length - 3];
    if (
      last3rdHistory &&
      Math.abs(last3rdHistory.total - last2ndHistory.total) <= SCORE_DELTA
    ) {
      return ProgressTypes.CASE_1_1_2;
    }
    return ProgressTypes.CASE_1_1_1;
  }

  private getIncreasingPeriod() {
    if (this.history.length < 2) {
      return { increasingWeeks: 0, increasingDays: 0 };
    }

    let i = this.history.length - 2;
    const lastHistory = this.history[i];
    for (; i >= 0; i--) {
      if (this.history[i + 1].total < this.history[i].total) break;
    }
    const increaseStartItem = this.history[Math.max(i, 0)];
    const increasingWeeks = dayjs(lastHistory.updatedAt).diff(
      increaseStartItem.updatedAt,
      "week"
    );
    const increasingDays = dayjs(lastHistory.updatedAt).diff(
      increaseStartItem.updatedAt,
      "day"
    );

    return { increasingWeeks, increasingDays };
  }

  private getDecreasingPeriod() {
    if (this.history.length < 2) {
      return {
        decreasingWeeks: 0,
        decreasingDays: 0,
        decreasingPoints: 0,
        decreasingStartDate: "",
      };
    }

    let i = this.history.length - 2;
    const lastHistory = this.history[this.history.length - 1];
    for (; i >= 0; i--) {
      if (this.history[i + 1].total > this.history[i].total) break;
    }
    const decreaseStartItem = this.history[i + 1];
    const decreasingWeeks = dayjs(lastHistory.updatedAt).diff(
      decreaseStartItem.updatedAt,
      "week"
    );
    const decreasingDays = dayjs(lastHistory.updatedAt).diff(
      decreaseStartItem.updatedAt,
      "day"
    );
    const decreasingStartDate = dayjs(decreaseStartItem.updatedAt).format(
      "MMM D, YYYY"
    );
    const decreasingPoints = decreaseStartItem.total - lastHistory.total;

    return {
      decreasingWeeks,
      decreasingDays,
      decreasingPoints,
      decreasingStartDate,
    };
  }

  public getSummary(): TProgressSummary {
    const progressType = this.determineProgressType();
    const { increasingWeeks } = this.getIncreasingPeriod();
    const { decreasingWeeks, decreasingPoints, decreasingStartDate } =
      this.getDecreasingPeriod();

    switch (progressType) {
      case ProgressTypes.CASE_1_1_1:
        return {
          title: "Scores not improving? Don’t worry!",
          summary:
            "It’s common for your PrairieScore to take a bit of time to improve. Remember to take an assessment regularly to continue monitoring your wellbeing.",
        };
      case ProgressTypes.CASE_1_1_2:
        return {
          title: "Your care team is reviewing your progress.",
          summary: `Hmm.... It seems like your score has been inreasing over the past ${increasingWeeks} weeks. Your care team will review your progress and reach out to you if we need to make any adjustments to your treatment plan.`,
        };
      case ProgressTypes.CASE_1_2_1:
        return {
          title: "You’re making great progress!",
          summary: `Your score <b>decreased by ${decreasingPoints} points</b> since ${decreasingStartDate}. This lets us know that you’ve been experienceing less symptoms related to anxiety and depression.`,
        };
      case ProgressTypes.CASE_1_2_2:
        return {
          title: `You’re getting better ${decreasingWeeks} weeks in a row!`,
          summary: `Congratulations - we’re so happy for you! Your score has <b>decreased by ${decreasingPoints}</b> points over the past ${decreasingWeeks} weeks. Constant progress like this mean you’re on your way to feeling much better!`,
        };
      case ProgressTypes.CASE_1_3_1:
        return {
          title:
            "Your score increased slightly, but don't worry too much about it!",
          summary:
            "Always remember - mental health journey has its own ebbs and flows. While your score increased slightly, we’ll be watching out for your progress so that you don’t have to worry about it. We’re always here for you!",
        };
      case ProgressTypes.CASE_1_3_2:
        return {
          title: "Your care team is reviewing your progress.",
          summary: `Hmm.... It seems like your score has been inreasing over the past ${increasingWeeks} weeks. Your care team will review your progress and reach out to you if we need to make any adjustments to your treatment plan.`,
        };
      case ProgressTypes.CASE_2_1:
        return {
          title: "You’re doing great, as always!",
          summary:
            "It seems like you’ve been stable with minimum symptoms of anxiety and depression. We’re so happy for you! Feel free to reach out to your Prairie care team when you ",
        };
      case ProgressTypes.CASE_2_2:
        return {
          title: "You’re doing even better!",
          summary:
            "We have two great news - you have minimum symptoms of anxiety and depression, and your mental health is continuing to improve! We would say that calls for a celebration.",
        };
      case ProgressTypes.CASE_2_3:
        return {
          title: "You’re doing well - nothing to worry about!",
          summary:
            "While your score increased slightly, you still have minimum symptoms of anxiety and depression. We’ll keep an eye on your progress, but there’s nothing to be worried about!",
        };
      case ProgressTypes.NO_CASE:
      default:
        return {
          title: "You have no scores recorded yet.",
          summary: "Please update your scores whenever you have chance.",
        };
    }
  }
}
