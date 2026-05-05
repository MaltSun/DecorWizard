import { DecorElement } from '../models/DecorElements';
import { AnswerOption } from '../models/type';

export interface TagWeights {
  [tag: string]: number;
}

const LIKELIHOOD_TABLE = {
  YES: 2.0,  
  MAYBE: 0.5,
  NO: -2.0,   
  IDK: 0      
};

export function calculateTagWeights(
  elements: DecorElement[],
  answers: Record<string, AnswerOption>
): TagWeights {
  const weights: TagWeights = {};

  elements.forEach(({ tag, index }) => {
    const ans = answers[tag];
    if (!ans) return;

    const prior = index;

    const likelihood = LIKELIHOOD_TABLE[ans] || 0;

    const currentWeight = weights[tag] || 0;
    weights[tag] = currentWeight + (likelihood * prior);
  });

  return weights;
}

export function getTopTags(weights: TagWeights, count = 5) {
  return Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([tag, weight]) => ({ tag, weight }));
}
