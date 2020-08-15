interface Musician {
    singles: number;
    albums: number;
}

interface Rapper {
    singles: number;
    albums: number;
    styles: number;
}

// it gives an error
// var eminem: Musician = {
//     singles: 120,
//     albums: 80,
//     styles: 4
// }
var eminem: Musician = {
    singles: 120,
    albums: 80,
}
// Errors: Cannot convert Musician to Rapper
// var rapper: Rapper = eminem;

// Works
var rapper: Rapper = <Rapper>eminem;
rapper.styles = 4;
console.log(rapper);

// Forced type assertions
var rapperName: string = 'Rapper Eminem';

// Error: Cannot convert 'string' to 'number'
// var singles: number = <number>rapperName;

// Works
var singles: number = <number><any>rapperName;
console.log(singles);

// Prepare two interfaces: House and Mansion.
// The second should have one more property than the first one.
// Declare new variable with type from House interface
// - but provide also that additional parameter(property) from the Mansion interface
// - fix it with type assertion
// Finally try to force the type assertion.

interface House {
    rooms: number;
    isSwimmingPool: boolean
}

interface Mansion {
    rooms: number;
    isSwimmingPool: boolean;
    isParkingArea: boolean
}

let house: House = {
    rooms: 5,
    isSwimmingPool: false,
    // isParkingArea: false gives an error
}

let mansionHouse: Mansion = <Mansion>house;
mansionHouse.isParkingArea = true;
console.log(mansionHouse);

let mansionHouseRooms: number = mansionHouse.rooms;
console.log(mansionHouseRooms);
