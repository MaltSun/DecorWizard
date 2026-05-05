// import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TreeSurvey from '../TreeSurvey/TreeSurvey';
import DecorQuestions from '../DecorQuestion/DecorQuestions';
import { firstTreeRoot } from '../../trees/firstTreeRoot';
import { secondTreeRoot } from '../../trees/secondTreeRoot';
import { thirdTreeRoot } from '../../trees/thirdTreeRoot';
import { forthTreeRoot } from '../../trees/forthTreeRoot';

import React, { useState, useMemo } from 'react';

const MainSurvey: React.FC = () => {
  const { t } = useTranslation(['questions', 'common']);
  const [stageIndex, setStageIndex] = useState(0);
  
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({});

  const steps = useMemo(() => [
    { id: 'first', title: t('formAndTiers'), root: firstTreeRoot() },
    { id: 'second', title: t('colorAndStyle'), root: secondTreeRoot() },
    { id: 'third', title: t('materialsAndAccents'), root: thirdTreeRoot() },
    { id: 'forth', title: t('reasonability'), root: forthTreeRoot() },
  ], [t]);

  const handleComplete = (treeId: string, userAnswers: Record<string, string>) => {
    const newAnswers = { ...answers, [treeId]: userAnswers };
    setAnswers(newAnswers);
    
    localStorage.setItem('survey_answers', JSON.stringify(newAnswers));
    
    setStageIndex(prev => prev + 1);
  };

  if (stageIndex >= steps.length) {
    return <DecorQuestions collectedAnswers={answers} />;
  }

  const currentStep = steps[stageIndex];

  return (
    <TreeSurvey
      key={currentStep.id} 
      treeName={currentStep.title}
      root={currentStep.root}
      onComplete={(tags) => handleComplete(currentStep.id, answers[currentStep.id] || {})} 
    />
  );
};


export default MainSurvey;