// 5.1. Describe types of Vehicles via enumeration.
enum Vehicles {
    Van,
    Taxi,
    Bus,
    Ambulance,
    Skateboard,
    Bicycle,
    Scooter,
    Motorcycle,
    Crane,
    Forklift,
    Tractor,
    Cementmixer,
    Dumptruck,
    Subway,
    Aerialtramway,
    Helicopter,
    Airplane,
    Balloon,
    Carriage,
    Rowboat,
    Boat,
    Train,
}

// 5.2. Use enumeration to describe sizes of boxes (for example if we sell something in them):
// - split it across multiple blocks.

enum ShirtNeckSize {
    SMALL = 15.5,
    MEDIUM = 16.5,
    LARGE = 17,
}

enum ShirtNeckSize {
    XL = 18,
    XL2 = 18.5,
    XL3 = 19.5
}

console.log(ShirtNeckSize.SMALL)
