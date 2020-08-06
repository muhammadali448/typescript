type InputType = number | string;
type CombinableInput = {
    input1: InputType,
    input2: InputType,
    resultConversion: "as-string" | "as-number"
}
function combineInputs(input: CombinableInput) {
    let result: number | string;
    if (typeof input.input1 === "number" && typeof input.input2 === "number" || input.resultConversion === "as-number") {
        result = +input.input1 + +input.input2;
    }
    else {
        result = input.input1.toString() + input.input2.toString();
    }
    // if (resultConversion === "as-number") {
    //     return +result;
    // }
    return result;
}
const resultNumber = combineInputs({
    input1: 3,
    input2: 10,
    resultConversion: "as-number"
});
console.log(resultNumber);
const resultString = combineInputs({
    input1: "Hello ",
    input2: "World",
    resultConversion: "as-string"
});
console.log(resultString);
const resultNumberString = combineInputs({
    input1: "10",
    input2: "40",
    resultConversion: "as-number"
});
console.log(resultNumberString);

type User = { name: string } | string;
let u1: User = { name: 'Max' };
u1 = "false";