import { QuestionNode } from "../models/QuestionNode";
export function secondTreeRoot() {
    const secondRoot = new QuestionNode("Торт для дня рождения?", ["birthday"]);

    secondRoot.yesBranch = new QuestionNode("Этот торт для ребёнка?", ["child"]);//
    secondRoot.yesBranch.yesBranch = new QuestionNode(
        "Торт должен соответствовать конкретной тематике?",
        ["thematic"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["natureInspired"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт для охотника?",
        ["hunter"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для рыбака?",
        ["fisher"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для футбольного фаната?",
        ["footballFan"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
        ["thematic"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
        ["styleOfKnownBrands"]
    );

    secondRoot.noBranch = new QuestionNode(
        "Этот торт для свадьбы или годовщины?",
        ["weddingOrAnniversary"]
    );
    secondRoot.yesBranch.noBranch = new QuestionNode(
        "Торт для женщины?",
        ["woman"]
    );
    secondRoot.yesBranch.yesBranch = new QuestionNode(
        "Торт должен соответствовать конкретной тематике?",
        ["thematic"]
    );

    secondRoot.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для мужчины?",
        ["man"]
    );
    secondRoot.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["natureInspired"]
    );
    secondRoot.yesBranch.yesBranch.noBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["natureInspired"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["natureInspired"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт для охотника?",
        ["hunter"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для рыбака?",
        ["fisher"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для футбольного фаната?",
        ["footballFan"]
    );
    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
        ["thematicCake"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
        ["styleOfKnownBrands"]
    );

    secondRoot.noBranch.noBranch = new QuestionNode(
        "Это торт для сообщения какой-то новости?",
        ["notificationCake"]
    );

    secondRoot.noBranch.noBranch.yesBranch = new QuestionNode(
        "Это торт для предложения?",
        ["proposalCake"]
    );

    secondRoot.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        "Это гендерный торт?",
        ["genderedCake"]
    );

    return secondRoot;
}