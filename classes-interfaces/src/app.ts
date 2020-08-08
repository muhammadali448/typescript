// interface Person {
//     name: string;
//     age: number;
//     greet(message: string): void;
// }
interface Appnamed {
    readonly appName?: string;
    outputName?: string;
}
interface Greetable extends Appnamed {
    greet(message: string): void;
}
// work same as interface in this case
// type Person = {
//     name: string;
//     age: number;
//     greet(message: string): void;
// }
// let user1: Person;
// user1 = {
//     name: "Muhammad Ali",
//     age: 25,
//     greet(message) {
//         console.log(`${message}, ${this.name}`);
//     }
// }
// console.log(`${user1.name}, ${user1.age}`);
// user1.greet("Hello world");

class Person implements Greetable {
    private name: string;
    appName?: string;
    age: number;
    constructor(name: string, appName?: string) {
        this.name = name;
        if (appName) {
            this.appName = appName;
        }
        this.age = 25;
    }

    public set setAppName(v: string) {
        this.appName = v;
    }

    greet(message: string): void {
        console.log(`${message}, ${this.name} ${this.appName ? "on " + this.appName : ""}`);
    }
}

const user1: Greetable = new Person("Muhammad Ali", "Linkedin");
const user2: Greetable = new Person("Sufiyan", "Google");
const user3: Greetable = new Person("Yasir Abbas", "Facebook");
// user1.appName = "facebook"; // readonly property
user1.greet("Hello world");
user2.greet("A.salam");
user3.greet("Hi");

interface addFunc {
    (no1: number, no2: number): number;
}

let add: addFunc;

add = (no1: number, no2: number) => {
    return no1 + no2;
}

console.log(`Addition result: ${add(3, 5)} `);