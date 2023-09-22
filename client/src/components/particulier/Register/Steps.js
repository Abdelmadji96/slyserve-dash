import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Steps(props) {
  const classes = useStyles();
  const steps = [
    {
      text: "Inserez vos informations 1/3",
      completed: props.step1,
    },
    {
      text: "Votre identité 2/3",
      completed: props.step2,
    },
    { text: "Votre compte a été crée 3/3", completed: props.step3 },
  ];

  return (
    <div className={classes.root}>
      <Stepper>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={index} {...stepProps} completed={step.completed}>
              <StepLabel {...labelProps}>{step.text}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
