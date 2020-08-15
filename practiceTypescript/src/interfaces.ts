// Exercise 4

// Describe some Monuments with:
// - interface
// - array
// Compare their heights in a function, find the tallest one.

interface MonumentType {
    title: string,
    height: number
}

const monuments: MonumentType[] = [];

monuments.push({
    title: "The Statue of Unity, portraying Sardar Vallabhbhai Patel",
    height: 576
})
monuments.push({
    title: "Statue of Buddha standing",
    height: 380
})
monuments.push({
    title: "Spring Temple Buddha statue",
    height: 420
})

const tallestHeight = monuments.sort((a: MonumentType, b: MonumentType) => {
    if (a.height > b.height) {
        return -1;
    }
    else if (a.height < b.height) {
        return 1
    }
    else {
        return 0
    }
});

console.log("The tallest monument: ", tallestHeight[0])