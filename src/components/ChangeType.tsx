import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [questionType, setQuestionType] = useState<QuestionType>(
        "short_answer_question",
    );

    function changeQuestionType(): void {
        const newQType = "short_answer_question";
        if (questionType === "short_answer_question") {
            setQuestionType(newQType);
        } else {
            setQuestionType("multiple_choice_question");
        }
    }

    return <Button onClick={() => changeQuestionType}>Change Type</Button>;
}
