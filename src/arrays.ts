/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    if (numbers.length === 0) {
        return [];
    }
    const first = numbers[0];
    const last = numbers[numbers.length - 1];
    return numbers.length === 1 ? [first, first] : [first, last];
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    const newArr: number[] = numbers.map(
        (eachNum: number): number => eachNum * 3,
    );
    return newArr;
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const intArr: number[] = [];
    numbers.map((eachString: string): number =>
        parseInt(eachString) ?
            intArr.push(parseInt(eachString))
        :   intArr.push(0),
    );
    return intArr;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    return amounts
        .map((eachString: string): string => eachString.replaceAll("$", ""))
        .map((eachString: string): number => {
            const parsed = parseInt(eachString);
            return Number.isNaN(parsed) ? 0 : parsed;
        });
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const newList: string[] = messages.map((eachWord: string): string => {
        return eachWord.charAt(eachWord.length - 1) === "!" ?
                eachWord.toUpperCase()
            :   eachWord;
    });

    const filtered: string[] = newList.filter(
        (eachWord: string): boolean =>
            eachWord.charAt(eachWord.length - 1) !== "?",
    );

    return filtered;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    const newArr: string[] = words.filter(
        (eachWord: string): boolean => eachWord.length < 4,
    );
    return newArr.length;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length > 0) {
        return colors.every(
            (eachColor: string): boolean =>
                eachColor === "red" ||
                eachColor === "blue" ||
                eachColor === "green",
        );
    } else if (colors.length === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    if (addends.length > 1) {
        const sum = addends.reduce(
            (currentTotal: number, eachNum: number): number =>
                currentTotal + eachNum,
            0,
        );
        const newArr = addends.map((eachNum: number): string =>
            eachNum.toString(),
        );
        const stringRep = newArr.join(",").replaceAll(",", "+");
        const mathRep: string = sum.toString() + "=" + stringRep;
        return mathRep;
    } else if (addends.length === 1) {
        const mathRep: string = addends.toString();
        return mathRep + "=" + mathRep;
    } else {
        return "0=0";
    }
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    const newArr = [...values];

    if (values.every((value: number): boolean => value > 0)) {
        const sum = values.reduce(
            (currentTotal: number, num: number) => currentTotal + num,
            0,
        );
        newArr.push(sum);
        return newArr;
    } else {
        const firstNegativeIndex = values.findIndex(
            (value: number): boolean => value < 0,
        );

        const slicedArr = newArr.slice(0, firstNegativeIndex);

        const sum = slicedArr.reduce(
            (currentTotal: number, eachNum: number): number =>
                currentTotal + eachNum,
            0,
        );

        newArr.splice(firstNegativeIndex + 1, 0, sum);

        return newArr;
    }
}
