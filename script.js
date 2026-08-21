const songs = [
  ["Golden Hour", "JVKE", 209, "audio/goldenhour.mp3"],
  ["Ceilings", "Lizzy McAlpine", 194, "Ceilings.mp3"],
  ["Death Bed", "Powfu ft. beabadoobee", 173, "Death Bed.mp3"],
];

const $ = (id) => document.querySelector(id);

const title = $("#title");
const artist = $("#artist");
const link = $("#link");
const bar = $("#progress");
const now = $("#now");
const left = $("#left");
const status = $("#status");
const vinyl = $("#vinyl");
const list = $("#list");
const playBtn = $("#play");

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${secs}`;
};

function updateUI() {
  const [name, singer, duration, audioFile] = songs[currentSongIndex];

title.textContent = name;
artist.textContent = singer;

link.removeAttribute("href");
link.style.cursor = "default";

list.innerHTML = songs.map((songData, index) => {
  const isActive = index === currentSongIndex ? "active" : "";
  return `
  <a class="song-item ${isActive}" data-song="${index}" href="javascript:void(0);">
    <span>0${index + 1}</span>
    <span>${songData[0]}</span>
    <span>▶</span>
  </a>
`;
}).join("");

status.textContent = isPlaying ? "Memutar" : "Jeda";
playBtn.innerHTML = isPlaying ? "Ⅱ <span>Jeda</span>" : "▶ <span>Putar</span>";
vinyl.classList.toggle("is-spinning", isPlaying);
}

function changeSong(index) {
  currentSongIndex = index;
  const audioFile = songs[currentSongIndex][3];
  
  audio.src = audioFile;

 isPlaying = true;
 audio.play();

 updateUI();
}

function togglePlay() {
if (!audio.src) {
  audio.src = songs[currentSongIndex][3];
}

if (isPlaying) {
  audio.pause();
} else {
  audio.play();
}

isPlaying = !isPlaying;
  updateUI();
}

audio.addEventListener("timeupdate", () => {
  const currentTime = audio.currentTime;
  const duration = songs[currentSongIndex][2];
  const percent = (currentTime / duration) * 100;

  bar.max = duration;
  bar.value = currentTime;
  bar.style.setProperty("--progress", `${percent}%`);

  now.textContent = formatTime(currentTime);
  left.textContent = `-${formatTime(duration - currentTime)}`;
});

audio.addEventListener("ended", () => {
  changeSong((currentSongIndex + 1) % songs.length);
});

playBtn.onclick = togglePlay;
$("#next").onclick = () => changeSong((currentSongIndex + 1) % songs.length);
$("#prev").onclick = () => changeSong((currentSongIndex + songs.length - 1) % songs.length);

bar.oninput = () => {
  audio.currentTime = Number(bar.value);
  updateUI();
};

list.onclick = (event) => {
  const item = event.target.closest("[data-song]");
  if (item) {
    changeSong(Number(item.dataset.song));
  }
};

updateUI();
