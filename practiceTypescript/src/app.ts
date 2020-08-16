// Constructors example
class Training {
  constructor(
    private category: string,
    private title: string,
    private noOfDays: number
  ) {}
  buy() {
    console.log(
      "Buying this " +
        this.noOfDays +
        " day(s) " +
        this.title +
        " course from category " +
        this.category
    );
  }
}
// Constructor parameters are mapped to member variables.
// If we prefix a constructor parameter with an access modifier (ie. private),
// it will automatically be mapped for us.
// We can refer to these constructor parameters as if they were declared
// as properties on the class, for example this.title, can be used anywhere within the Training class
// to obtain the Training title on that instance
class BuyTraining {
  constructor(private trainings: Training[]) {}
  buy() {
    var training = this.chooseTraining();
    training.buy();
  }
  private chooseTraining() {
    // Decision can come for example from the form in the browser, another webservice, db, etc
    var whichTraining = 2;
    return this.trainings[whichTraining];
  }
}
var trainings = [
  new Training("Drupal", "Drupal 8 for Developers", 2),
  new Training("Angular", "Angular 2 Fundamentals", 3),
  new Training("Nodejs", "Developing web applications with the MERN stack", 5),
  new Training("SQL", "T-SQL basics", 2),
  new Training("Management", "BPMN for code architects", 3),
];
var choice = new BuyTraining(trainings);
choice.buy();

// Create structure about songs and make jukebox,
// which will randomly get the song from the list of songs.

class Song {
  constructor(
    private title: string,
    private artist: string,
    private year: number
  ) {}
  printInfo() {
    console.log(
      `Title: ${this.title}, Artist: ${this.artist}, Year: ${this.year}`
    );
  }
}

class JukeBox {
  constructor(private songs: Song[]) {}
  playSong() {
    const song = this.chooseRandomSong();
    song.printInfo();
  }
  private chooseRandomSong(): Song {
    return this.songs[Math.floor(Math.random() * this.songs.length)];
  }
}

const jukebox = new JukeBox([
  new Song("Forgive Me", "Chloe x Halle", 2020),
  new Song("Exile", "Taylor Swift and Bon Iver", 2020),
  new Song("Water", "Kehlani", 2020),
  new Song("Ferris Wheel", "Sylvan Esso", 2020),
  new Song("On My Own", "Shamir", 2020),
]);

jukebox.playSong();

// Properties and methods
class CartWithTrainings {
  private trainings: Training[] = [];

  static maxTraining: number = 10;

  constructor(public cartId: string) {}

  addTraining(training: Training) {
    if (this.trainings.length >= CartWithTrainings.maxTraining) {
      throw new Error("To many courses in your Cart.");
    }
    this.trainings.push(training);
  }

  public get getTrainings(): Training[] {
    return this.trainings;
  }
}

// Creating a new instance
var coursesCart = new CartWithTrainings("Cart1");

// Accessing a public instance property
var nameCart = coursesCart.cartId;

// Calling a public instance method
coursesCart.addTraining(new Training("GIT", "Git for Users", 1));

// Accessing a public static property
var maxTrainings = CartWithTrainings.maxTraining;
console.log(coursesCart.getTrainings);
// Make a Playlist of songs (reuse code from exercise 17)
// - declare class for playlist
// -- use private and static properties
// - prepare 'addSong' method
// - create new instance, access and call:
// -- playlist, its public instance property, public instance method,
// public static property

class Playlist {
  private songs: Song[] = [];
  static maximumSongs: number = 5;
  constructor(public playListId: string) {}
  addSong(song: Song) {
    if (this.songs.length >= Playlist.maximumSongs) {
      throw new Error("To many songs in your Playlist.");
    }
    this.songs.push(song);
  }

  public get getSongs(): Song[] {
    return this.songs;
  }
}
// Creating a new instance
const playlist = new Playlist("Plalist-1");
// Accessing a public instance property
var nameCart = playlist.playListId;
// Calling a public instance method
playlist.addSong(new Song("In the end", "Linkin Park", 1));
// Accessing a public static property
var maxSongs = Playlist.maximumSongs;
console.log(playlist.getSongs);
