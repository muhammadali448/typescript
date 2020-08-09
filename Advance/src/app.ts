type Admin = {
    name: string,
    privileges: string[]
}

type Employee = {
    name: string,
    startDate: Date
}

// interface Admin {
//     name: string,
//     privileges: string[]
// }

// interface Employee {
//     name: string,
//     startDate: Date
// }

type AdminEmployee = Admin & Employee;
// interface AdminEmployee extends Admin, Employee {
// }
const adminEmployee: AdminEmployee = {
    name: "Muhammad Ali",
    privileges: ["Create Server"],
    startDate: new Date()
};

// console.log(adminEmployee);

type Combinable = string | number;
type Numeric = number | boolean

// const fees:Combinable & Numeric = "hello"; Error
// const fees:Combinable & Numeric = false;
const fees: Combinable & Numeric = 25;
function add(no1: number, no2: number): number;
function add(no1: string, no2: string): string;
function add(input1: Combinable, input2: Combinable) {
    // this is called a typeguard
    if (typeof input1 === "string" || typeof input2 === "string") {
        return input1.toString() + input2.toString() as String;
    }
    return input1 + input2;
}

const resultNo = add(1, 4);
const resultStr = add("Hello, ", "world");
console.log(`Result add overloads no: ${resultNo}`);
console.log(`Result add overloads str: ${resultStr}`);

type UnknownEmployee = Admin | Employee;

function isAdmin(admin: UnknownEmployee): admin is Admin {
    return (admin as Admin).privileges !== undefined;
}

function isEmployee(employee: UnknownEmployee): employee is Employee {
    return (employee as Employee).startDate !== undefined;
}

function printEmployeeInfo(e: UnknownEmployee) {
    console.log(`Name: ${e.name}`)
    // if (isAdmin(e)) {
    //     console.log(`Privileges: ${e.privileges}`);
    // }
    // if (isEmployee(e)) {
    //     console.log(`Start Date: ${e.startDate.toISOString()}`)
    // }
    if ("privileges" in e) {
        console.log(`Privileges: ${e.privileges}`);
    }
    if ("startDate" in e) {
        console.log(`Start Date: ${e.startDate.toISOString()}`)
    }
}

printEmployeeInfo({
    name: "Muhammad Ali",
    privileges: ["Create Ui", "Create Apis"],
    startDate: new Date()
})

interface getDriving {
    driving(): void
}

class Car implements getDriving {
    driving() {
        console.log("Driving a car");
    }
}

class Truck implements getDriving {
    driving() {
        console.log("Driving a truck");
    }

    loadCargo(no: number) {
        console.log(`${no} items are loaded in cargo`);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(v: Vehicle) {
    v.driving();
    if (v instanceof Truck) {
        v.loadCargo(5);
    }
}
useVehicle(v1);
useVehicle(v2);

// Discrimination Union
type Official = {
    __typename: 'Official',
    name: string,
    age: number,
}

type Monarch = {
    __typename: 'Monarch',
    name: string,
    title: string,
}

type Boss = Official | Monarch;

const bossDescription = (boss: Boss) => {
    let message;
    switch (boss.__typename) {
        case "Official":
            message = `${boss.name}, ${boss.age} years old`;
            break;
        case "Monarch":
            message = `${boss.title}, ${boss.name}`;
    }
    console.log(message);
}

bossDescription({
    __typename: "Monarch",
    title: "Ottoman",
    name: "Muhammad Ali",
})
// const userInput = <HTMLInputElement>document.getElementById("user_input")!;
// const userInput = document.getElementById("user_input") as HTMLInputElement;
// const button = document.getElementById("btn")! as HTMLButtonElement;
// button.addEventListener("click", () => {
//     console.log(userInput.value)
// });

// index interface
interface States {
    [state: string]: boolean;//indexer
}

let s: States = { 'enabled': true, 'maximized': false };
console.log(s);
console.log(s['maximized']);

interface errorContainer {
    [prop: string]: string
}

const error: errorContainer = {
    "email": "Not a valid email"
}

interface States1 {
    [index: number]: boolean;
}

let s1: States1 = [true, false];
console.log(s1);
console.log(s1[0]);

const userData = {
    name: "yasir",
    age: 25,
    job: {
        companyName: "google"
    }
}

console.log(userData?.job?.companyName);

const userResponse = {
    // product: ["mobile"]
    product: null
}

console.log(userResponse.product ?? 'There are no products');

