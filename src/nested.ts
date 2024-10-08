import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const published: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const nonEmpty: Question[] = questions.filter(
        (question: Question): boolean =>
            // if question body OR question expected is not empty string then it is not empty

            (question.body !== "" || question.expected !== "") &&
            //AND && if options length is not 0 OR question is short answer it must not be an empty question either
            //will check options length not zero first if tht is false, n it moves to short answer being true, it must not be empty
            (question.options.length !== 0 ||
                question.type === "short_answer_question"),
    );

    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const foundQ: Question | undefined = questions.find(
        (question: Question): boolean => question.id === id,
    );

    return foundQ ?? null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const newArr: Question[] = questions.filter(
        (question: Question): boolean => question.id !== id,
    );
    return newArr;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question: Question): string => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions
        .map((question: Question): number => question.points)
        .reduce((accum: number, point: number) => accum + point, 0);
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions
        .filter((question: Question): boolean => question.published)
        .map((question: Question) => question.points)
        .reduce((accum: number, point: number) => accum + point, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const headers: String = "id,name,options,points,published";
    return headers
        .concat("\n")
        .concat(
            questions
                .map(
                    (question: Question): string =>
                        `${question.id},${question.name},${question.options.length},${question.points},${question.published ? "true" : "false"}`,
                )
                .join("\n"),
        );
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map((question: Question): Answer => {
        const answer: Answer = {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false,
        };

        return answer;
    });
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map((question: Question) => {
        const newQ = { ...question, published: true };
        return newQ;
    });
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    return (
        questions.every(
            (question: Question): boolean =>
                question.type === "multiple_choice_question",
        ) ||
        questions.every(
            (question: Question) => question.type === "short_answer_question",
        )
    );
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    return [...questions, makeBlankQuestion(id, name, type)];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    const foundQuestion = questions.find(
        (question: Question) => question.id === targetId,
    );

    const renamed = { ...foundQuestion };
    renamed.name = newName;

    const newQ: Question[] = questions.map((question: Question): Question => {
        return question === foundQuestion ? (renamed as Question) : question;
    });

    return newQ;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    const foundQ = questions.find((question) => question.id === targetId);
    const newQType = { ...foundQ };
    newQType.type = newQuestionType;
    if (newQType.type === "short_answer_question") {
        newQType.options = [];
    }
    const newQ = questions.map((question) => {
        return question === foundQ ? (newQType as Question) : question;
    });
    return newQ;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    const newArray = questions.map((question) => {
        //map to new array to avoid mutating original

        if (question.id === targetId) {
            // if ids match, create a new options array within question thru spread to avoid mutating original

            const newOptionArray = [...question.options];

            //follow instructions in these conditionals

            if (targetOptionIndex === -1) {
                newOptionArray.push(newOption);
            } else {
                newOptionArray[targetOptionIndex] = newOption;
            }

            //after creating newOptionArray, create a new question thru spread and mutate options array into newOptionArray
            // avoids mutating original cuz this is a new object and new array

            return { ...question, options: newOptionArray };
        }

        // return question as-is if id isnt target id

        return question;
    });

    return newArray;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const foundQ: Question = questions.find(
        (question) => question.id === targetId,
    ) as any as Question;
    const index = questions.findIndex((question) => question.id === targetId);
    const dupeQ = duplicateQuestion(newId, foundQ);
    const newArr = [...questions];
    newArr.splice(index + 1, 0, dupeQ);
    return newArr;
}
