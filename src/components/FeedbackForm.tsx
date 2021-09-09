import React, { useState } from "react";
import clsx from "clsx";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

import {
  useColorStyles,
  useLayoutStyles,
  useBackgroundColorStyles,
} from "./useCommonStyles";
import TextInput from "./TextInput";
import { useSubmitFeedback } from "../api";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      borderRadius: theme.spacing(2),
      padding: theme.spacing(3, 2),

      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },

    textInput: {
      "& .MuiInputBase-root": {
        backgroundColor: "white",
      },
    },
  })
);

const DEFAULT_FEEDBACK_TITLE = "How was your experience with this survey?";

interface FeedbackFormProps {
  title?: string;
}

const FeedbackForm = ({
  title = DEFAULT_FEEDBACK_TITLE,
}: FeedbackFormProps) => {
  const classes = useStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const bkColorClasses = useBackgroundColorStyles();
  const submitFeedback = useSubmitFeedback();

  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);

  const methods = useForm({
    mode: "onBlur",
  });

  const handleChangeFeedbackScore = (_: any, value: number | null) => {
    if (value === null) return;
    setFeedbackScore(value);
  };

  const handleSendFeedback = async () => {
    await submitFeedback.mutate({
      ...methods.getValues(),
      score: feedbackScore,
    });
    setFeedbackSent(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendFeedback();
  };

  if (feedbackSent) {
    return (
      <Box
        width={360}
        className={clsx(bkColorClasses.primaryNavy, classes.container)}
      >
        <Typography variant="h6" className={colorClasses.white}>
          Thank you for your feedback!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      width={360}
      className={clsx(bkColorClasses.primaryNavy, classes.container)}
    >
      <Typography
        variant="h6"
        className={clsx(colorClasses.white, layoutClasses.mb2)}
      >
        {title}
      </Typography>
      {feedbackScore === null ? (
        <Rating
          name="feedback"
          size="large"
          value={feedbackScore}
          classes={{ iconEmpty: colorClasses.distinctiveGray }}
          onChange={handleChangeFeedbackScore}
        />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormProvider {...methods}>
            <TextInput
              name="feedback"
              className={classes.textInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableRipple
                      className={clsx(
                        colorClasses.secondaryGreen1,
                        layoutClasses.noPadding
                      )}
                      onClick={handleSendFeedback}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormProvider>
        </form>
      )}
    </Box>
  );
};

export default FeedbackForm;
