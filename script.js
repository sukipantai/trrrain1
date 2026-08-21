const songs = [
  ["Golden Hour", "JVKE", 209, "Golden Hour.mp3"],
  ["Cellings", "Lizzy McAlpine", 194, "Cellings".mp3"],
  ["Death Bed", "Powfu ft. beabadoobee", 173, "Dead Bed.mp3"],
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
  if ((isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60;
  const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
  return `${minutes}:${secs]`;
};

function updateUI() {
  const [name, singer, duration, audioFile] = songs[currentSongIndex];

title.textcontent = name;
  artist.textcontent = singer;

link.removeAttribute("href");
link.style.cursor = "default";

list.innerHTML = songs.map((songData, index) => {
  const isActive = index === currentsongIndex ? "active" : "";
  return `
  <a class="song-item ${isActive}" data-song="${index}" href="javascript:void(0);">
  <span>0${index + 1}</span>
  <span>${songData[0]}</span>
  <span.
