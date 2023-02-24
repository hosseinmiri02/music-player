const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "Remembrance",
    displayName: "Remembrance",
    artist: "Atis Freivalds",
  },
  {
    name: "A Night Under the Stars",
    displayName: "A Night Under the Stars",
    artist: "Atis Freivalds",
  },
  {
    name: "Memory Lane",
    displayName: "Memory Lane",
    artist: "Atis Freivalds",
  },

  {
    name: "Equilibrium",
    displayName: "Equilibrium",
    artist: "Atis Freivalds",
  },
  {
    name: "From Nowhere Until the Beginning",
    displayName: "From Nowhere Until the Beginning",
    artist: "Atis Freivalds",
  },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.flac`;
  image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = function () {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);
// Update Progress Bar & Time
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    // Delay switching duration Element to avoid NaN
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

    // Calculate display for current Time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
