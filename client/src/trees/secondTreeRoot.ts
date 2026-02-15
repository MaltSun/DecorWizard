import { QuestionNode } from "../models/QuestionNode";
export function secondTreeRoot() {
    const secondRoot = new QuestionNode("Торт для дня рождения?", ["birthday"]);

    secondRoot.yesBranch = new QuestionNode("Этот торт для ребёнка?", ["child"]);//
    secondRoot.yesBranch.yesBranch = new QuestionNode(
        "Торт должен соответствовать конкретной тематике?",
        ["тематический_торт"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["торт_вдохновлён_природой"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт для охотника?",
        ["охотник"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для рыбака?",
        ["рыбак"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для футбольного фаната?",
        ["футбольный_фанат"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
        ["торт_вдохновлённый_фильмом_или_мультфильмом"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
        ["стиль_известных_брендов"]
    );

    secondRoot.noBranch = new QuestionNode(
        "Этот торт для свадьбы или годовщины?",
        ["свадебный_или_годовщинный_торт"]
    );
    secondRoot.yesBranch.noBranch = new QuestionNode(
        "Торт для женщины?",
        ["женщина"]
    );
    secondRoot.yesBranch.yesBranch = new QuestionNode(
        "Торт должен соответствовать конкретной тематике?",
        ["тематический_торт"]
    );

    secondRoot.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для мужчины?",
        ["мужчина"]
    );
    secondRoot.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["торт_вдохновлён_природой"]
    );
    secondRoot.yesBranch.yesBranch.noBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["торт_вдохновлён_природой"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
        ["торт_вдохновлён_природой"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
        "Торт для охотника?",
        ["охотник"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для рыбака?",
        ["рыбак"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
        "Торт для футбольного фаната?",
        ["футбольный_фанат"]
    );
    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
        "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
        ["торт_вдохновлённый_фильмом_или_мультфильмом"]
    );

    secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
        "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
        ["стиль_известных_брендов"]
    );

    secondRoot.noBranch.noBranch = new QuestionNode(
        "Это торт для сообщения какой-то новости?",
        ["сообщение_новости"]
    );

    secondRoot.noBranch.noBranch.yesBranch = new QuestionNode(
        "Это торт для предложения?",
        ["предложение_руки_и_сердца"]
    );

    secondRoot.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
        "Это гендерный торт?",
        ["гендерный_торт"]
    );

    return secondRoot;
}