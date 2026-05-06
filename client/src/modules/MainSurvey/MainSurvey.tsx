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
  const [allCollectedTags, setAllCollectedTags] = useState<Record<string, { tag: string; weight: number }[]>>({});

  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({});

  const steps = useMemo(() => [
    { id: 'first', title: t('formAndTiers'), root: firstTreeRoot() },
    { id: 'second', title: t('colorAndStyle'), root: secondTreeRoot() },
    { id: 'third', title: t('materialsAndAccents'), root: thirdTreeRoot() },
    { id: 'forth', title: t('reasonability'), root: forthTreeRoot() },
  ], [t]);
  const handleComplete = (treeId: string, calculatedTags: { tag: string; weight: number }[]) => {
       const top = calculatedTags.filter(t => t.weight > 0);

    console.log(`Результат для ветки ${treeId}:`, top);

    setAllCollectedTags(prev => ({ ...prev, [treeId]: top }));
    setStageIndex(prev => prev + 1);
  };

  if (stageIndex >= steps.length) {
    return <DecorQuestions collectedTags={allCollectedTags} reasonabilityIndex={5} />;
  }

  const currentStep = steps[stageIndex];

  return (
    <TreeSurvey
      key={currentStep.id}
      treeName={currentStep.title}
      root={currentStep.root}
      onComplete={(tags) => handleComplete(currentStep.id, tags)} />)
};


export default MainSurvey;