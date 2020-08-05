enum Role {
    ADMIN,
    USER
}
const person: {
    name: string, age: number, hobbies: string[],
    //  roles: [string, number] 
    role: Role
} = {
    name: "ali",
    age: 25,
    hobbies: ["pc games", "watching youtube videos", "maza"],
    // roles: ["admin", 2]
    role: Role.ADMIN
}
// person.roles.push("hello");
// for (const role of person.roles) {
//     console.log(role);
// }
// const person = {
//     name: "ali",
//     age: 25,
//     hobbies: ["pc games", "watching youtube videos", "maza"],
//     roles: ["admin", 2]
// }
let teamsArr: string[];
teamsArr = ["1", '2', "3"];
// console.log(person.name);

// for (const hobby of person.hobbies) {
//     console.log(hobby.toUpperCase());
// }

if (person.role === Role.ADMIN) {
    console.log("I am Admin")
}