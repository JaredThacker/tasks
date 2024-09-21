import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";

export function EditMode(): React.JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>("Your Name");
    const [student, setStudent] = useState<boolean>(true);

    function updateEditMode(event: React.ChangeEvent<HTMLInputElement>) {
        setEditMode(event.target.checked);
    }

    function updateStudentStatus(event: React.ChangeEvent<HTMLInputElement>) {
        setStudent(event.target.checked);
    }

    return (
        <div>
            <h3>Edit Mode</h3>
            <FormCheck
                type="switch"
                role="switch"
                id="isEdit"
                checked={editMode}
                onChange={updateEditMode}
            />
            <FormCheck
                type="checkbox"
                role="checkbox"
                id="isStudent"
                checked={student}
                onChange={updateStudentStatus}
            />
            {editMode && (
                <FormControl
                    as="textarea"
                    role="textbox"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                />
            )}
            <div>
                {!editMode && (
                    <>
                        {student ?
                            `${name} is a student`
                        :   `${name} is not a student`}
                    </>
                )}
            </div>
        </div>
    );
}
