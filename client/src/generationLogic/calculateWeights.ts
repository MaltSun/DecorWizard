import { DecorElement } from '../models/DecorElements';
import { AnswerOption } from '../models/type';

export interface TagWeights {
  [tag: string]: number;
}

export function calculateTagWeights(
  elements: DecorElement[],
  answers: Record<string, AnswerOption>
): TagWeights {
  const weights: TagWeights = {};

  elements.forEach((el) => {
    const ans = answers[el.tag];
    if (!ans) return;

    let delta = 0;
    switch (ans) {
      case AnswerOption.YES: delta = 1; break;
      case AnswerOption.MAYBE: delta = 0.5; break;
      case AnswerOption.NO: delta = -1; break;
      default: delta = 0;
    }

    weights[el.tag] = (weights[el.tag] || 0) + delta * el.index;
  });

  return weights;
}

export function getTopTags(weights: TagWeights, count = 5) {
  return Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([tag, weight]) => ({ tag, weight }));
}
