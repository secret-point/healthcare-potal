import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TQuestion } from "src/types";
import { Theme } from "src/theme/types/createPalette";
import CheckboxField from "src/components/CheckboxField";
import TextInput from "src/components/TextInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textInput: {
      "& .MuiInputBase-root": {
        borderRadius: theme.spacing(1),
      },
      "& .MuiInputBase-input": {
        padding: theme.spacing(2),
      },
    },
  })
);

interface MCQQuestionProps {
  question: TQuestion;
}

const MCQQuestion: FC<MCQQuestionProps> = ({ question }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {question.options?.map((option) => (
        <Grid item key={option.code} xs={12} sm={6}>
          <CheckboxField
            name={option.code}
            label={option.display}
            color="secondary"
          />
        </Grid>
      ))}

      <Grid item xs={12} sm={6}>
        <TextInput
          name="MCQ_OTHER_REASON"
          placeholder="Others (please specify)"
          className={classes.textInput}
        />
      </Grid>
    </Grid>
  );
};

export default MCQQuestion;
