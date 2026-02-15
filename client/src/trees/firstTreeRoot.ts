import { QuestionNode } from '../models/QuestionNode';

export function firstTreeRoot(): QuestionNode {
    const firstRoot = new QuestionNode('Предпочитаете классическую круглую форму?', ['круглый_торт']);

    firstRoot.yesBranch = new QuestionNode('Предпочли бы высокий вытянутый торт?', ['высокий_торт']);
    firstRoot.yesBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['одноярусный_торт']);
    firstRoot.yesBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['фальш_ярус']);
    firstRoot.noBranch = new QuestionNode('Вам нравятся квадратные торты?', ['квадратный_торт']);
    firstRoot.noBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['одноярусный_торт']);
    firstRoot.noBranch.noBranch = new QuestionNode('Вам нравятся торты необычной формы (сердце, цифра, геометрия)?', ['необычная_форма']);
    firstRoot.noBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['фальш_ярус']);
    firstRoot.noBranch.noBranch.yesBranch = new QuestionNode('Вы хотите одноярусный торт?', ['одноярусный_торт']);
    firstRoot.noBranch.noBranch.noBranch = new QuestionNode('Вы хотите одноярусный торт?', ['одноярусный_торт']);
    firstRoot.noBranch.noBranch.yesBranch.noBranch = new QuestionNode('В вашем торте может быть фальш-ярус?', ['фальш_ярус']);
    return firstRoot;
}
