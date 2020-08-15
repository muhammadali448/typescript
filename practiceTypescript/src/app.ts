// Interfaces examples

interface CourseVenue {
    // Properties
    city: string;
    country: string;
}

interface CourseParticipant {
    // Properties
    name: string;
}

interface CourseEvent {
    // Constructor
    new(): CourseEvent;
    // Properties
    currentLocation: CourseVenue;
    // Methods
    // bookVenue(venue: CourseVenue);
    // addDelegate(delegate: CourseParticipant);
    // removeDelegate(delegate: CourseParticipant);
}

// Create a set of interfaces to describe a vehicle, passengers, location, and destination.
// Declare properties and methods using type annotations.
// Declare constructors using the ''new'' keyword.

interface vehicle {
    carType: string;
    wheels: number;
}
interface passengers {
    isMale: boolean;
    noOfSeats: number;
}
interface location {
    address: string
}

interface Destination {
    vehicle: vehicle;
    passengers: passengers;
    location: location;
    new(): Destination;
}
