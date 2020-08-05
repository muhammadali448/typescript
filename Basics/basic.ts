function add(no1: number, no2: number, isPrint: boolean, resultStr: string) {
    let result = no1 + no2;
    if (isPrint) {
        console.log(resultStr + result);
    }
    return result;
}
const isPrint = true
const resultStr = "Result is: "
const result = add(3, 3, isPrint, resultStr);
console.log(result);