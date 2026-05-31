import React, { useEffect, useState } from 'react';
import { calculateTagWeights, getTopTags } from '../../generationLogic/calculateWeights';
import type { QuestionNode } from '../../models/QuestionNode';
import { getNextQuestion } from '../../generationLogic/surveyLogic';
import { TreeSurveyProps } from './type';
import { AnswerOption } from '../../models/type';
import { Button, Typography } from '@mui/material';
import { ButtonContainer } from './style';
import { useTranslation } from 'react-i18next';

const TreeSurvey: React.FC<TreeSurveyProps> = ({ treeName, root, onComplete }) => {
  const [current, setCurrent] = useState<QuestionNode | null>(root);
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});

  const [t] = useTranslation('treeSurvey');

  useEffect(() => {
    setCurrent(root);
  }, [root]);

  const handleAnswer = (ans: AnswerOption) => {
    if (!current) return;

    const newAnswers = { ...answers };
    current.tags.forEach(tag => {
      newAnswers[tag] = ans;
    });

    setAnswers(newAnswers);
    const next = getNextQuestion(current, ans);

    if (next) {
      setCurrent(next);
    } else {
      const tagsToCalculate = Object.keys(newAnswers).map(tag => ({
        tag, index: 1.0,  question: '',
      }));

      const weights = calculateTagWeights(tagsToCalculate as any, newAnswers);
      const top = getTopTags(weights, 5);
      onComplete(top.filter(t => t.weight > 0));
    }
  };

  if (!current) return null;

  return (
    <>
      <Typography variant="h2" sx={{ mb: 3 }}>
        {current.question.toUpperCase()}
      </Typography>
      <ButtonContainer>
        {[AnswerOption.YES, AnswerOption.MAYBE, AnswerOption.IDK, AnswerOption.NO].map(a => (
          <Button
            variant="contained"
            key={a}
            onClick={() => handleAnswer(a)}
            sx={{ m: 1 }}
          >
            {t(a.toUpperCase())}
          </Button>
        ))}
      </ButtonContainer>
    </>
  );
};

export default TreeSurvey;