import { QuestionNode } from "../models/QuestionNode";

export function forthTreeRoot(): QuestionNode {
    const forthRoot = new QuestionNode(
        'Хотите, чтобы торт выглядел "дорого" и роскошно?',
        ['роскошный_стиль']
    );

    forthRoot.yesBranch = new QuestionNode(
        'Хотите, чтобы декор был насыщенным и детализированным?',
        ['насыщенный_и_детализированный_декор']
    );

    forthRoot.yesBranch.yesBranch = new QuestionNode(
        'Хотите торт в стиле ламбет (объемный, с рюшами и узорами)?',
        ['ламбет_рюши_и_узоры']
    );

    forthRoot.yesBranch.noBranch = new QuestionNode(
        'Нравится, когда торт расписан узорами или рисунками?',
        ['написанный_узорами_или_рисунками_декор']
    );

    forthRoot.yesBranch.noBranch.noBranch = new QuestionNode(
        'Вам ближе нежные пастельные оттенки?',
        ['нежные_пастельные_оттенки']
    );

    forthRoot.yesBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был белым?',
        ['белый']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        'Нравятся яркие, сочные цвета в оформлении?',
        ['яркие_и_сочные_цвета']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Предпочитаете глубокие, тёмные тона?',
        ['тёмные_тона']
    );

    forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch.yesBranch =
        new QuestionNode('Предпочитаете чёрный торт?', ['чёрный']);

    forthRoot.noBranch = new QuestionNode(
        'Вам по душе минималистичный стиль?',
        ['минимализм']
    );

    forthRoot.noBranch.yesBranch = new QuestionNode(
        'Вам ближе нежные пастельные оттенки?',
        ['нежные_пастельные_оттенки']
    );

    forthRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был белым?',
        ['белый']
    );

    forthRoot.noBranch.noBranch = new QuestionNode(
        'Предпочитаете однотонное оформление торта?',
        ['однотонное_оформление']
    );

    forthRoot.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите торт с бархатным (велюровым) покрытием?',
        ['велюровое_покрытие']
    );

    forthRoot.noBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт в стиле 'голый торт' (naked cake) с минимальным покрытием?",
        ['голый_торт']
    );

    forthRoot.noBranch.noBranch.noBranch.noBranch = new QuestionNode(
        'Нравятся зеркальные (глянцевые) глазури?',
        ['зеркальные_глазури']
    );

    forthRoot.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
        'Хотите, чтобы торт был украшен мраморным эффектом?',
        ['мраморный_эффект']
    );

    forthRoot.noBranch.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        'Хотите, чтобы торт был с эффектом омбре (плавный переход цвета)?',
        ['омбре']
    );
    ;

    return forthRoot;
}