function combineInputs(input1: number | string, input2: number | string) {
    let result: number | string;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
const resultNumber = combineInputs(3, 3);
console.log(resultNumber);
const resultString = combineInputs("Hello ", "World");
console.log(resultString);