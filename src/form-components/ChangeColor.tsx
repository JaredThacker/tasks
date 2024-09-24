import React, { useState } from "react";
import { FormCheck } from "react-bootstrap";

export function ChangeColor(): React.JSX.Element {
    const [color, setColor] = useState<string>("red");
    const colors: string[] = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "cyan",
        "magenta",
        "white",
        "black",
    ];

    function updateColor(event: React.ChangeEvent<HTMLInputElement>) {
        setColor(event.target.value);
    }
    return (
        <div>
            <h3>Change Color</h3>
            <div>
                {colors.map((eachColor) => (
                    <FormCheck
                        inline
                        key={eachColor}
                        value={eachColor}
                        type="radio"
                        onChange={updateColor}
                        label={
                            <span style={{ backgroundColor: `${eachColor}` }}>
                                {eachColor}
                            </span>
                        }
                        checked={eachColor === color}
                    />
                ))}
            </div>
            <span>
                You have chosen{" "}
                <span
                    data-testid="colored-box"
                    style={{ backgroundColor: `${color}` }}
                >
                    {color}
                </span>
            </span>
        </div>
    );
}
