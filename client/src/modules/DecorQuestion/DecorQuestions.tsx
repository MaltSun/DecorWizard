import React, { useState } from 'react';
import decorElements from '../../data/decorElements.json';
import { calculateTagWeights, getTopTags } from '../../generationLogic/calculateWeights';
import Result from '../Result/Result';
import type { DecorElement } from '../../models/DecorElements';
import { AnswerOption } from '../../models/type';
import { Button, Typography } from '@mui/material';
import { ButtonContainer, ContentContainer } from './style';
import { useTranslation } from 'react-i18next';

interface Props {
  reasonabilityIndex: number;
  collectedTags: Record<string, { tag: string; weight: number }[]>;
}

const DecorQuestions: React.FC<Props> = ({ reasonabilityIndex, collectedTags }) => {
  const [answers, setAnswers] = useState<Record<string, AnswerOption>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [decorIndex, setDecorIndex] = useState(0);

  const [t] = useTranslation('treeSurvey')

  const handleAnswer = (tag: string, ans: AnswerOption) => {
    setAnswers(prev => ({ ...prev, [tag]: ans }));
    const delta =
      ans === AnswerOption.YES
        ? 1
        : ans === AnswerOption.MAYBE
          ? 0.5
          : ans === AnswerOption.NO
            ? -1
            : 0;
    setDecorIndex(prev => prev + delta);

    if (
      Math.abs(reasonabilityIndex - decorIndex) < 0.5 ||
      currentIndex >= decorElements.length - 1
    ) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  if (finished) {
    const weights = calculateTagWeights(decorElements as DecorElement[], answers);
    const topDecor = getTopTags(weights, 3);

    return <Result resultsByTree={{ ...collectedTags, decor: topDecor }} />;
  }

  const current = decorElements[currentIndex];
  return (
    <ContentContainer>
      <Typography variant="h2">{current.question}</Typography>
      <ButtonContainer>
        {[AnswerOption.YES, AnswerOption.MAYBE, AnswerOption.IDK, AnswerOption.NO].map(ans => (
          <Button variant='contained' key={ans} onClick={() => handleAnswer(current.tag, ans)}>
            {t(ans.toUpperCase())}
          </Button>
        ))}
      </ButtonContainer>
    </ContentContainer>
  );
};

export default DecorQuestions;
