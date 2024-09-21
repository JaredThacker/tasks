import React, { useState } from "react";
import { FormSelect } from "react-bootstrap";

export function MultipleChoiceQuestion({
    options,
    expectedAnswer,
}: {
    options: string[];
    expectedAnswer: string;
}): React.JSX.Element {
    const [choice, setChoice] = useState<string>(options[0]);

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    return (
        <div>
            <h3>Multiple Choice Question</h3>
            <FormSelect value={choice} onChange={updateChoice}>
                {options.map((eachOption: string) => (
                    <option key={eachOption} value={eachOption}>
                        {eachOption}
                    </option>
                ))}
            </FormSelect>

            <div>{choice === expectedAnswer ? "✔️" : "❌"}</div>
        </div>
    );
}
