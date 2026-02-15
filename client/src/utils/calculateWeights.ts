import { AnswerOption } from "../models/type";

export interface DecorElement {
  index: number;
  question: string;
  tag: string;
}

export interface TagWeights {
  [tag: string]: number;
}


export function calculateTagWeights(
  elements: DecorElement[],
  answers: Record<string, AnswerOption>
): TagWeights {
  const weights: TagWeights = {};

  elements.forEach(({ tag, index }) => {
    const answer = answers[tag];
    if (!answer) return;

    let delta = 0;
    switch (answer) {
      case AnswerOption.YES:
        delta = 1;
        break;
      case AnswerOption.MAYBE:
        delta = 0.5;
        break;
      case AnswerOption.NO:
        delta = -1;
        break;
      default:
        delta = 0;
    }

    weights[tag] = (weights[tag] || 0) + delta * index;
  });

  return weights;
}

export function getTopTags(weights: TagWeights, count = 5) {
  return Object.entries(weights)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([tag, weight]) => ({ tag, weight }));
}
