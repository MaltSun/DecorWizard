import { QuestionNode } from '../models/QuestionNode';
import { AnswerOption } from '../models/type';

export function getNextQuestion(
  current: QuestionNode,
  answer: string
): QuestionNode | null {
  if (answer === AnswerOption.YES && current.yesBranch) return current.yesBranch;
  if (answer === AnswerOption.NO && current.noBranch) return current.noBranch;
  if (answer === AnswerOption.MAYBE) return current.yesBranch ?? current.noBranch ?? null;
  if (answer === AnswerOption.IDK) return current.noBranch ?? current.yesBranch ?? null;
  return null;
}
