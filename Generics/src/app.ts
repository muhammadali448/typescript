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
function merge<T extends object, U extends object>(a: T, b: U) {
    return {
        ...a,
        ...b
    }
}

// const user1: any = merge({ name: "Ali", age: 25 }, { isGraduated: true });
const user1 = merge(
    { name: "Ali", age: 25 },
    { isGraduated: true, hobbies: ["playing games"] });
console.log(user1);
// const user1 = merge(
//     { name: "Ali", age: 25 },
//     30); it gives an error

interface lengthy {
    length: number
}

function countAndDescription<T extends lengthy>(el: T): [T, string] {
    let description = "Got no value";
    if (el.length === 1) {
        description = "Got 1 element";
    }
    else if (el.length > 1) {
        description = `Got ${el.length} elements`;
    }
    return [el, description];
}

// const result = countAndDescription(["Hello world", "Hi, there"]);
const result = countAndDescription("Hi, there");
console.log(result);

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

let res = extractAndConvert({ name: "ali" }, "name");
console.log(res);

class DataStorage<T> {
    private data: T[] = [];
    addItem(item: T) {
        this.data.push(item)
    }
    removeItem(item: T) {
        // if (this.data.indexOf(item) === -1) {
        //     return;
        // }
        if (typeof item === "object") {
            for (const key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    this.data = this.data.filter(t => t[key] !== item[key]);
                }
            }
        }
        else {
            this.data.splice(this.data.indexOf(item), 1);
        }
    }
    getItems() {
        return [
            ...this.data
        ]
    }
}

const data1 = new DataStorage<string>();
data1.addItem("hello");
data1.addItem("5");
data1.addItem("false");
console.log(data1.getItems());
data1.removeItem("5");
console.log(data1.getItems());

const data2 = new DataStorage<number>();
data2.addItem(1);
data2.addItem(3);
data2.addItem(5);
console.log(data2.getItems());
data2.removeItem(3);
console.log(data2.getItems());

const data3 = new DataStorage<string | number>();
data3.addItem(1);
data3.addItem("user");
data3.addItem(5);
console.log(data3.getItems());
data3.removeItem("user");
console.log(data3.getItems());

const objectStorage = new DataStorage<object>();
objectStorage.addItem({ user: "user1" });
objectStorage.addItem({ user: "user2" });
objectStorage.addItem({ user: "user3" });
console.log(objectStorage.getItems());
objectStorage.removeItem({ "user": "user2" });
console.log(objectStorage.getItems());