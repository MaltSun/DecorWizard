export class QuestionNode {
  question: string;
  tags: string[];
  yesBranch?: QuestionNode;
  noBranch?: QuestionNode;
  onComplete?: () => Promise<void>;

  constructor(question: string, tags: string[] = []) {
    this.question = question;
    this.tags = tags;
  }
}
