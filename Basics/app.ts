let userInput: unknown; // any
let userName: string;
userInput = 2;
userInput = false;
userInput = "hello world";
if (typeof userInput === "string") {
    userName = userInput;
}
console.log(userName);

function generateError(message: string, errorCode: number): never {
    throw { message: message, errorCode: errorCode };
}
generateError("An network error occured", 500);
