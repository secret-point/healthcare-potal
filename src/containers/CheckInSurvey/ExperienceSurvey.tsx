import clsx from "clsx";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import Button from "../../components/Button";
import RadioField from "../../components/RadioField";
import TextInput from "../../components/TextInput";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import { TQuestion } from "../../types";

import MCQQuestion from "./MCQQuestion";

interface ExperienceSurveyProps {
  questions: TQuestion[];
  onNext: VoidFunction;
}

const ExperienceSurvey: FC<ExperienceSurveyProps> = ({ questions, onNext }) => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const [number, setNumber] = useState(0);

  const { watch } = useFormContext();

  const handleClickNext = () => {
    if (number + 1 >= questions.length) {
      onNext();
    } else {
      setNumber(number + 1);
    }
  };

  const handleClickPrevious = () => {
    if (number <= 0) return;
    setNumber(number - 1);
  };

  const question = questions[number];
  const answer = watch(question.code);
  const progress = (number * 100) / questions.length;
  const isRadioQuestion = ["GAD", "PHQ"].includes(question.type);

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mb6}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progress}
        />
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb6}>
        <Typography
          variant="body2"
          className={clsx(fontClasses.fontBolder, layoutClasses.mb1)}
        >
          {["QUESTION", number + 1].join(" ")}
        </Typography>
        {question.header && (
          <Typography variant="h3" className={fontClasses.fontNormal}>
            {question.header}
          </Typography>
        )}
        <Typography variant="h3">{question.question}</Typography>
      </Grid>

      <Grid item xs={12} className={layoutClasses.mb6}>
        {["GAD", "PHQ"].includes(question.type) && question.options && (
          <RadioField
            layout={{ xs: 6 }}
            name={question.code}
            options={question.options}
          />
        )}
        {question.type === "MCQ" && <MCQQuestion question={question} />}
        {question.type === "FRQ" && (
          <TextInput name="Some placeholder text TBD" multiline rows={4} />
        )}
      </Grid>

      <Grid item xs={12}>
        <Button
          text="Next"
          color="primary"
          variant="contained"
          disabled={!answer && isRadioQuestion}
          onClick={handleClickNext}
        />
      </Grid>

      <Grid item xs={12}>
        <Button text="Back" variant="text" onClick={handleClickPrevious} />
      </Grid>
    </Grid>
  );
};

export default ExperienceSurvey;
