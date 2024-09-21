import React, { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer,
}: {
    expectedAnswer: string;
}): React.JSX.Element {
    const [answer, setAnswer] = useState<string>("");

    function updateAnswer(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setAnswer(event.target.value);
    }
    return (
        <div>
            <h3>Check Answer</h3>
            <FormGroup controlId="CheckAnswers">
                <FormLabel>Check Answers</FormLabel>
                <FormControl
                    type="string"
                    as={"textarea"}
                    value={answer}
                    onChange={updateAnswer}
                />
            </FormGroup>
            <div>{expectedAnswer === answer ? "✔️" : "❌"}</div>
        </div>
    );
}
