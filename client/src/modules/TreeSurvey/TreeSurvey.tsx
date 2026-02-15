import React, { useEffect, useState } from 'react';
import { calculateTagWeights, getTopTags } from '../../generationLogic/calculateWeights';
import type { QuestionNode } from '../../models/QuestionNode';
import { getNextQuestion } from '../../generationLogic/surveyLogic';
import { TreeSurveyProps } from './type';
import { AnswerOption } from '../../models/type';
import { Button, Typography } from '@mui/material';
import { ButtonContainer } from './style';

const TreeSurvey: React.FC<TreeSurveyProps> = ({ treeName, root, onComplete }) => {
  const [current, setCurrent] = useState<QuestionNode | null>(root);
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});

  useEffect(() => {
    setCurrent(root);
  }, [root]);

  const handleAnswer = (ans: AnswerOption) => {
    if (!current) return;

    const updatedAnswers = { ...answers };
    current.tags.forEach(tag => {
      updatedAnswers[tag] = ans;
    });
    setAnswers(updatedAnswers);

    const next = getNextQuestion(current, ans);

    if (next) {
      setCurrent(next);
    } else {
      const dummyData = Object.keys(updatedAnswers).map((tag, index) => ({
        tag,
        index,
        question: '',
      }));

      const weights = calculateTagWeights(dummyData, updatedAnswers);
      const top = getTopTags(weights, 3);
      console.log(` ${treeName} завершено:`, top);
      onComplete(top);
    }
  };

  if (!current) return null;

  return (
    <>
      <Typography variant="body1">{current.question}</Typography>
      <ButtonContainer>
        {[AnswerOption.YES, AnswerOption.MAYBE, AnswerOption.IDK, AnswerOption.NO].map(a => (
          <Button key={a} onClick={() => handleAnswer(a)}>
            {a.toUpperCase()}
          </Button>
        ))}
      </ButtonContainer>
    </>
  );
};

export default TreeSurvey;
