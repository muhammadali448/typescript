// const user1 = Object.freeze({
//     name: "ali"
// });

// user1.name = "yasir";

const user1 = {
    name: "ali"
} as const;

// user1.name = "yasir"; readonly property
const user2: { name: string, readonly role: string } = {
    name: "ali",
    role: "user"
}
user2.name = "yasir"
// user2.role = "admin"
interface Movie {
    title: string;
    lengthMinutes: number;
}

// The array is typed using the Movie interface
var movies: Movie[] = [];

// Each item added to the array is checked for type compatibility
movies.push({
    title: 'American History X',
    lengthMinutes: 119,
    // production: 'USA'    // example of structural typing
});

movies.push({
    title: 'Sherlock Holmes',
    lengthMinutes: 128,
});

movies.push({
    title: 'Scent of a Woman',
    lengthMinutes: 157
});

function compareMovieLengths(x: Movie, y: Movie) {
    if (x.lengthMinutes > y.lengthMinutes) {
        return -1;
    }
    if (x.lengthMinutes < y.lengthMinutes) {
        return 1;
    }
    return 0;
}

// The array.sort method expects a comparer that accepts 2 Movies
var moviesOrderedLength = movies.sort(compareMovieLengths);

// Get the first element from the array, which is the longest
var longestMovie = moviesOrderedLength[0];

console.log(longestMovie.title); // Scent of a Woman