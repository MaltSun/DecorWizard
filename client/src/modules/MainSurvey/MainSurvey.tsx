import React, { useState } from "react";
import TreeSurvey from "../TreeSurvey/TreeSurvey";
import DecorQuestions from "../DecorQuestion/DecorQuestions";
import { firstTreeRoot } from "../../trees/firstTreeRoot";
import { secondTreeRoot } from "../../trees/secondTreeRoot";
import { thirdTreeRoot } from "../../trees/thirdTreeRoot";
import { forthTreeRoot } from "../../trees/forthTreeRoot";

const MainSurvey: React.FC = () => {
  const [stage, setStage] = useState(1);
  const [collectedTags, setCollectedTags] = useState<
    Record<string, { tag: string; weight: number }[]>
  >({});

  const handleComplete = (
    treeName: string,
    tags: { tag: string; weight: number }[]
  ) => {
    setCollectedTags((prev) => ({ ...prev, [treeName]: tags }));
    setStage((prev) => prev + 1);
  };

  if (stage === 5) {
    const forthTags = collectedTags["forth"] || [];
    const reasonabilityIndex =
      forthTags.reduce((acc, t) => acc + t.weight, 0) / (forthTags.length || 1);

    return (
      <DecorQuestions
        reasonabilityIndex={reasonabilityIndex}
        collectedTags={collectedTags}
      />
    );
  }

  switch (stage) {
    case 1:
      return (
        <TreeSurvey
          treeName="Форма и ярусы"
          root={firstTreeRoot()}
          onComplete={(tags) => handleComplete("first", tags)}
        />
      );
    case 2:
      return (
        <TreeSurvey
          treeName="Цвет и стиль"
          root={secondTreeRoot()}
          onComplete={(tags) => handleComplete("second", tags)}
        />
      );
    case 3:
      return (
        <TreeSurvey
          treeName="Материалы и акценты"
          root={thirdTreeRoot()}
          onComplete={(tags) => handleComplete("third", tags)}
        />
      );
    case 4:
      return (
        <TreeSurvey
          treeName="Разумность"
          root={forthTreeRoot()}
          onComplete={(tags) => handleComplete("forth", tags)}
        />
      );
    default:
      return null;
  }
};

export default MainSurvey;
