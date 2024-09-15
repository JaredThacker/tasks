import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [diceLeftValue, setDiceLeftValue] = useState<number>(2);
    const [diceRightValue, setDiceRightValue] = useState<number>(1);

    return (
        <>
            <span data-testid="left-die">Left Dice: {diceLeftValue}</span>
            <Button
                onClick={() => {
                    setDiceLeftValue(d6());
                }}
            >
                Roll Left
            </Button>{" "}
            <Button
                onClick={() => {
                    setDiceRightValue(d6());
                }}
            >
                Roll Right
            </Button>
            <span data-testid="right-die">Right Dice: {diceRightValue}</span>
            <span>
                {diceLeftValue === diceRightValue &&
                    diceLeftValue !== 1 &&
                    "Win"}
            </span>
            <span>{diceLeftValue === 1 && diceRightValue === 1 && "Lose"}</span>
        </>
    );
}
