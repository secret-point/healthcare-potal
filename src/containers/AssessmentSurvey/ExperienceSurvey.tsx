import clsx from "clsx";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "../../components/Button";
import RadioField from "../../components/RadioField";
import TextInput from "../../components/TextInput";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";
import { TQuestion } from "../../types";

import MCQQuestion from "./MCQQuestion";
import { useViewport } from "../../hooks/useViewport";

const useStyles = makeStyles(() =>
  createStyles({
    linearProgress: {
      borderRadius: 2,
    },
    questionTitle: {
      letterSpacing: "1px",
    },
  })
);

interface ExperienceSurveyProps {
  questions: TQuestion[];
  onNext: (form: any) => void;
}

const ExperienceSurvey: FC<ExperienceSurveyProps> = ({ questions, onNext }) => {
  const classes = useStyles();
  const { isMobile } = useViewport();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const [number, setNumber] = useState(0);

  const [form, setForm] = useState<any>({});
  const { watch, getValues } = useFormContext();

  const question = questions[number];
  const answer = watch(question.code);
  const progress = (number * 100) / questions.length;
  const isRadioQuestion = ["GAD", "PHQ"].includes(question.type);

  const handleClickNext = () => {
    const newForm = { ...form, ...getValues() };
    setForm(newForm);
    if (number + 1 >= questions.length) {
      onNext(newForm);
    } else {
      setNumber(number + 1);
    }
  };

  const handleDelayNext = () => {
    setTimeout(() => {
      handleClickNext();
    }, 500);
  };

  const handleClickPrevious = () => {
    if (number <= 0) return;
    setNumber(number - 1);
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
      >
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progress}
          className={classes.linearProgress}
        />
      </Grid>

      <Grid
        item
        xs={12}
        className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
      >
        <Typography
          variant="subtitle2"
          className={clsx(
            fontClasses.fontBolder,
            layoutClasses.mb1,
            classes.questionTitle
          )}
        >
          {["QUESTION", number + 1].join(" ")}
        </Typography>
        {question.header && (
          <Typography
            variant="h3"
            className={clsx(fontClasses.fontNormal, fontClasses.lineHeight15)}
          >
            {question.header}
          </Typography>
        )}
        <Typography variant="h3" className={fontClasses.lineHeight15}>
          {question.question}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        className={isMobile ? layoutClasses.mb4 : layoutClasses.mb6}
      >
        {isRadioQuestion && question.options && (
          <RadioField
            layout={{ xs: 12, sm: 6 }}
            name={question.code}
            options={question.options}
            onClick={handleDelayNext}
          />
        )}
        {question.type === "MCQ" && <MCQQuestion question={question} />}
        {question.type === "FRQ" && (
          <TextInput
            name={question.code}
            placeholder="Enter your comment here"
            multiline
            rows={4}
          />
        )}
      </Grid>

      {(!isRadioQuestion || !question.options) && (
        <Grid item xs={12}>
          <Button
            text="Next"
            color="primary"
            variant="contained"
            disabled={!answer && isRadioQuestion}
            onClick={handleClickNext}
          />
        </Grid>
      )}

      <Grid item xs={12}>
        <Button text="Back" variant="text" onClick={handleClickPrevious} />
      </Grid>
    </Grid>
  );
};

export default ExperienceSurvey;
