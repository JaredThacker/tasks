import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [reveal, setReveal] = useState<boolean>(false);
    return (
        <div>
            <Button
                onClick={() => {
                    setReveal(!reveal);
                }}
            >
                Reveal Answer
            </Button>
            <>{reveal && <>42</>}</>
        </div>
    );
}
