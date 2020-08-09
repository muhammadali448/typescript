console.log("Learning Generics");
const places: Array<string> = ["Karachi", "Dubai", "London"];
// places.push(2); cause an error because it's a string typed array

// const stringPromise: Promise<string> = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("It message is from Promise");
//     }, 2000);
// });

// stringPromise.then((data) => {
//     console.log(data.split(" "));
// })
function merge<T, U>(a: T, b: U) {
    return {
        ...a,
        ...b
    }
}

// const user1: any = merge({ name: "Ali", age: 25 }, { isGraduated: true });
const user1 = merge(
    { name: "Ali", age: 25 },
    { isGraduated: true, hobbies: ["playing games"] });
console.log(user1.hobbies);
