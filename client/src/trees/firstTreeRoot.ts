import { QuestionNode } from '../models/QuestionNode';

export function firstTreeRoot(): QuestionNode {
    const firstRoot = new QuestionNode('Предпочитаете классическую круглую форму?', ['roundShape']);

    firstRoot.yesBranch = new QuestionNode('Предпочли бы высокий вытянутый торт?', ['tallElongatedCake']);
    firstRoot.yesBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['singleLayerCake']);
    firstRoot.yesBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['falseLayer']);
    firstRoot.noBranch = new QuestionNode('Вам нравятся квадратные торты?', ['squareCake']);
    firstRoot.noBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['singleLayerCake']);
    firstRoot.noBranch.noBranch = new QuestionNode('Вам нравятся торты необычной формы (сердце, цифра, геометрия)?', ['unusualShape']);
    firstRoot.noBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['falseLayer']);
    firstRoot.noBranch.noBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['singleLayerCake']);
    firstRoot.noBranch.noBranch.noBranch = new QuestionNode('Вы хотите одноярусный торт?', ['singleLayerCake']);
    firstRoot.noBranch.noBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['falseLayer']);
    return firstRoot;
}
