const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Songs Titles
const songs = ["Taylor Swift - I Almost Do", "Ariana Grande - Only 1", "The Weeknd - Die For You", "Taylor Swift - White Horse", "Ariana Grande - Touch It", "Keyshia Cole - Love ", "Selena Gomez - It Ain't Me", "Ed Sheeran - Photograph"];
// KeepTrack of song
let songIndex = 0;
// Initially load song details into DOM
loadSong(songs[songIndex]);
// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `assets/audio/${song}.mp3`;
  cover.src = `assets/img/${song}.jpg`;
}
// Play Song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");
  audio.play();
}
// Pause Song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");
  audio.pause();
}
// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Update Progress Bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}
// Set Progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// Event Listener
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
// Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
// Time/Song Update
audio.addEventListener("timeupdate", updateProgress);
// Click on Progress Bar
progressContainer.addEventListener("click", setProgress);
// Song End
audio.addEventListener("ended", nextSong);