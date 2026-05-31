export class DecorElement {
  question: string;
  tag: string;
  index: number;

  constructor(question: string, tag: string, index: number) {
    this.question = question;
    this.tag = tag;
    this.index = index;
  }
}
