function add(no1: number, no2: number): number {
    return no1 + no2;
}

function printResult(result: number) {
    console.log(result);
}

printResult(add(5, 5));

let addMock: (a: number, b: number) => number;
addMock = add;
// addMock = 4;
// addMock = printResult;
console.log(addMock(8, 7));

function addCb(n1: number, n2: number, cb: (result: number) => void) {
    let result = n1 + n2;
    cb(result);
}

let no = addCb(1, 4, (result) => {
    console.log(result);
    // return result;
});
