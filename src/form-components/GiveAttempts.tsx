import React, { useState } from "react";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

export function GiveAttempts(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(3);
    const [attemptsRequested, setAttemptsRequested] = useState<number>(0);

    function updateAttemptsRequested(
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        if (!isNaN(Number.parseInt(event.target.value))) {
            setAttemptsRequested(Number.parseInt(event.target.value));
        }
    }

    return (
        <div>
            <FormGroup controlId="GiveAttempts">
                <FormLabel>GiveAttempts</FormLabel>
                <FormControl
                    type="number"
                    value={attemptsRequested}
                    onChange={updateAttemptsRequested}
                />
            </FormGroup>
            <button
                onClick={() => {
                    setAttempts(attempts - 1);
                }}
                disabled={attempts === 0}
            >
                Use
            </button>
            <button
                onClick={() => {
                    setAttempts(attemptsRequested + attempts);
                }}
            >
                Gain
            </button>
            <div>{attempts}</div>
            <h3>Give Attempts</h3>
        </div>
    );
}
