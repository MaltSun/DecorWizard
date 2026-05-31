import { QuestionNode } from "../../models/QuestionNode";

export interface TreeSurveyProps {
    treeName: string;
    root: QuestionNode;
    onComplete: (topTags: { tag: string; weight: number }[]) => void;
}

