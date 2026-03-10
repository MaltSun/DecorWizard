import { QuestionNode } from "../models/QuestionNode";

export function forthTreeRoot(): QuestionNode {
    const forthRoot = new QuestionNode(
        'Хотите, чтобы торт выглядел "дорого" и роскошно?',
        ['luxuryAndExpensiveLook']
    );

    forthRoot.yesBranch = new QuestionNode(
        'Хотите, чтобы декор был насыщенным и детализированным?',
        ['detailedAndRichDecor']
    );

    forthRoot.yesBranch.yesBranch = new QuestionNode(
        'Хотите торт в стиле ламбет (объемный, с рюшами и узорами)?',
        ['lambet']
    );

    forthRoot.yesBranch.noBranch = new QuestionNode(
        'Нравится, когда торт расписан узорами или рисунками?',
        ['handlePainting']
    );

    forthRoot.yesBranch.noBranch.noBranch = new QuestionNode(
        'Вам ближе нежные пастельные оттенки?',
        ['pastelColors']
    );

    forthRoot.yesBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был белым?',
        ['whiteCake']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        'Нравятся яркие, сочные цвета в оформлении?',
        ['juicyColors']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Предпочитаете глубокие, тёмные тона?',
        ['darkColors']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch.yesBranch =
        new QuestionNode('Предпочитаете чёрный торт?', ['blackCake']);

    forthRoot.noBranch = new QuestionNode(
        'Вам по душе минималистичный стиль?',
        ['minimalism']
    );

    forthRoot.noBranch.yesBranch = new QuestionNode(
        'Вам ближе нежные пастельные оттенки?',
        ['pastelColors']
    );

    forthRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был белым?',
        ['whiteCake']
    );

    forthRoot.noBranch.noBranch = new QuestionNode(
        'Предпочитаете однотонное оформление торта?',
        ['singleColorDecoration']
    );

    forthRoot.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите торт с бархатным (велюровым) покрытием?',
        ['velvetFinish']
    );

    forthRoot.noBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт в стиле 'голый торт' (naked cake) с минимальным покрытием?",
        ['nakedCake']
    );

    forthRoot.noBranch.noBranch.noBranch.noBranch = new QuestionNode(
        'Нравятся зеркальные (глянцевые) глазури?',
        ['mirroredGlaze']
    );

    forthRoot.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был украшен мраморным эффектом?',
        ['marbleEffect']
    );

    forthRoot.noBranch.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        'Хотите, чтобы торт был с эффектом омбре (плавный переход цвета)?',
        ['ombreEffect']
    );
    ;

    return forthRoot;
}