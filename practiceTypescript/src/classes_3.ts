// Class heritage example
interface Audio {
  play(): any;
}

class Song_ implements Audio {
  constructor(private artist: string, private title: string) {}
  play(): void {
    console.log("Playing " + this.title + " by " + this.artist);
  }
  static Comparer(a: Song_, b: Song_) {
    if (a.title === b.title) {
      return 0;
    }
    return a.title > b.title ? 1 : -1;
  }
}
class Playlist_ {
  constructor(public songs: Song_[]) {}
  play() {
    var song = this.songs.pop()!;
    song.play();
  }

  sort() {
    this.songs.sort(Song_.Comparer);
  }
}
class RepeatingPlaylist extends Playlist_ {
  private songIndex = 0;
  constructor(songs: Song_[]) {
    super(songs);
  }
  play() {
    this.songs[this.songIndex].play();
    this.songIndex++;
    if (this.songIndex >= this.songs.length) {
      this.songIndex = 0;
    }
  }
}

const a = new RepeatingPlaylist([new Song_("ali", "bala bala")]);
a.play();
