// import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TreeSurvey from '../TreeSurvey/TreeSurvey';
import DecorQuestions from '../DecorQuestion/DecorQuestions';
import { firstTreeRoot } from '../../trees/firstTreeRoot';
import { secondTreeRoot } from '../../trees/secondTreeRoot';
import { thirdTreeRoot } from '../../trees/thirdTreeRoot';
import { forthTreeRoot } from '../../trees/forthTreeRoot';

// const MainSurvey: React.FC = () => {
//   const { t } = useTranslation(['questions', 'common']);
//   const [stage, setStage] = useState(1);
//   const [collectedTags, setCollectedTags] = useState<
//     Record<string, { tag: string; weight: number }[]>
//   >({});

//   const handleComplete = (treeName: string, tags: { tag: string; weight: number }[]) => {
//     setCollectedTags(prev => ({ ...prev, [treeName]: tags }));
//     setStage(prev => prev + 1);
//   };

//   if (stage === 5) {
//     const forthTags = collectedTags['forth'] || [];
//     const reasonabilityIndex =
//       forthTags.reduce((acc, tag) => acc + tag.weight, 0) / (forthTags.length || 1);

//     return <DecorQuestions reasonabilityIndex={reasonabilityIndex} collectedTags={collectedTags} />;
//   }

//   switch (stage) {
//     case 1:
//       return (
//         <TreeSurvey
//           treeName={t('formAndTiers')}
//           root={firstTreeRoot()}
//           onComplete={tags => handleComplete('first', tags)}
//         />
//       );
//     case 2:
//       return (
//         <TreeSurvey
//           treeName={t('colorAndStyle')}
//           root={secondTreeRoot()}
//           onComplete={tags => handleComplete('second', tags)}
//         />
//       );
//     case 3:
//       return (
//         <TreeSurvey
//           treeName={t('materialsAndAccents')}
//           root={thirdTreeRoot()}
//           onComplete={tags => handleComplete('third', tags)}
//         />
//       );
//     case 4:
//       return (
//         <TreeSurvey
//           treeName={t('reasonability')}
//           root={forthTreeRoot()}
//           onComplete={tags => handleComplete('forth', tags)}
//         />
//       );
//     default:
//       return null;
//   }
// };




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
    
    // Сохраняем в localStorage только компактный объект
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