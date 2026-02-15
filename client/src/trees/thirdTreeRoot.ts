import { QuestionNode } from "../models/QuestionNode";

export function thirdTreeRoot() {
    const thirdRoot = new QuestionNode(
        "Надпись на самом торте — важный элемент?",
        ["надпись_на_торте"]
    );

    thirdRoot.yesBranch = new QuestionNode(
        "Нравятся торты с тайным посланием (сжигается верхний слой)?",
        ["тайное_послание"]
    );
    thirdRoot.yesBranch.noBranch = new QuestionNode(
        "Топпер — обязательный элемент для вашего торта?",
        ["топпер"]
    );
    thirdRoot.yesBranch.noBranch.yesBranch = new QuestionNode(
        "Хотите украсить торт топпером сверху?",
        ["топпер_сверху"]
    );
    thirdRoot.yesBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        "Предпочитаете топпер, закреплённый сбоку?",
        ["топпер_сбоку"]
    );

    thirdRoot.noBranch = new QuestionNode(
        "Хотели бы разместить фотографию виновника торжества на торте?",
        ["фотография_на_торте"]
    );
    thirdRoot.noBranch.yesBranch = new QuestionNode(
        "Торт должен быть шуточный?",
        ["шуточный_торт"]
    );


    return thirdRoot;
}