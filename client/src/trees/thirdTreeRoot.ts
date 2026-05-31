import { QuestionNode } from "../models/QuestionNode";

export function thirdTreeRoot() {
    const thirdRoot = new QuestionNode(
        "Надпись на самом торте — важный элемент?",
        ["inscriptionOnCake"]
    );

    thirdRoot.yesBranch = new QuestionNode(
        "Нравятся торты с тайным посланием (сжигается верхний слой)?",
        ["secretMessage"]
    );
    thirdRoot.yesBranch.noBranch = new QuestionNode(
        "Топпер — обязательный элемент для вашего торта?",
        ["topper"]
    );
    thirdRoot.yesBranch.noBranch.yesBranch = new QuestionNode(
        "Хотите украсить торт топпером сверху?",
        ["topperAbove"]
    );
    thirdRoot.yesBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        "Предпочитаете топпер, закреплённый сбоку?",
        ["topperSide"]
    );

    thirdRoot.noBranch = new QuestionNode(
        "Хотели бы разместить фотографию виновника торжества на торте?",
        ["photo"]
    );
    thirdRoot.noBranch.yesBranch = new QuestionNode(
        "Торт должен быть шуточный?",
        ["funnyCake"]
    );


    return thirdRoot;
}