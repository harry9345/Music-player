let trackList = [
  {
    id: 1,
    name: "Speak To Me",
    artist: "Pink Floyd",
    path: "./music/1.mp3",
  },
  {
    id: 2,
    name: "On The Road",
    artist: "Pink Floyd",
    path: "./music/2.mp3",
  },
  {
    id: 3,
    name: "Time",
    artist: "Pink Floyd",
    path: "./music/3.mp3",
  },
  {
    id: 4,
    name: "The Great Gig in  the sky",
    artist: "Pink Floyd",
    path: "./music/4.mp3",
  },
  {
    id: 5,
    name: "Money",
    artist: "Pink Floyd",
    path: "./music/5.mp3",
  },
  {
    id: 6,
    name: "Us And Them",
    artist: "Pink Floyd",
    path: "./music/6.mp3",
  },
  {
    id: 7,
    name: "Any color you like",
    artist: "Pink Floyd",
    path: "./music/7.mp3",
  },
  {
    id: 8,
    name: "Brain damage",
    artist: "Pink Floyd",
    path: "./music/8.mp3",
  },

  {
    id: 9,
    name: "Eclipse",
    artist: "Pink Floyd",
    path: "./music/9.mp3",
  },
];

let trackName = document.getElementById("trackName");
let artist = document.getElementById("artist");
let nowPlaying = document.getElementById("nowPlaying");
let currentTimer = document.getElementById("currentTimer");
let totallDuration = document.getElementById("totallDuration");
let playerDiv = document.getElementById("slider");
let seekSlider = document.getElementById("seekSlider");
let playStopBtn = document.getElementById("playStop");
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");

let trackIndex = 0;
let isPlaying = false;
let updateTimer;

let curentTrack = document.createElement("audio");
playerDiv.appendChild(curentTrack);

playStopBtn.addEventListener("click", playPouseTrack);
seekSlider.addEventListener("", seekTo);
nextBtn.addEventListener("click", nextTrack);
previousBtn.addEventListener("click", prevTrack);

function loadTrack(trackIndex) {
  // clear pre seek timer
  clearInterval(updateTimer);
  resetValues();

  // load new track
  curentTrack.src = trackList[trackIndex].path;
  console.log("trackList[trackIndex].path");
  curentTrack.load();

  // update new detail
  trackName.textContent = trackList[trackIndex].name;
  artist.textContent = trackList[trackIndex].artist;

  nowPlaying.textContent =
    "Now Playing : " + (trackIndex + 1) + " Of " + trackList.length;

  // for updating slider
  updateTimer = setInterval(seekUpdate, 1000);

  // move to next track
  curentTrack.addEventListener("ended", nextTrack);
  console.log("inside of load track ");
}

function resetValues() {
  currentTimer.textContent = " 00:00 ";
  totallDuration.textContent = " 00:00 ";
  seekSlider.value = 0;
}
// play and pouse track
function playPouseTrack() {
  console.log("inside of play and stop 1");
  if (!isPlaying) {
    playTrack();
  } else {
    pouseTrack();
  }
}
//play the loaded track
function playTrack() {
  curentTrack.play();
  isPlaying = true;
  playStopBtn.innerHTML = `<span class="glyphicon glyphicon-play" aria-hidden="true">&#9658;</span>`;
  console.log("hichi");
}
function pouseTrack() {
  curentTrack.pause();
  isPlaying = false;
  playStopBtn.innerHTML = `<span class="glyphicon glyphicon-pouse" aria-hidden="true">&#9612;&#9612;</span>`;
  console.log("harchi");
}

function nextTrack() {
  if (trackIndex < trackList.length - 1) {
    trackIndex += 1;
  } else {
    trackIndex = 0;
  }
  loadTrack(trackIndex);
  playTrack();
  console.log("next");
}

function prevTrack() {
  if (trackIndex > 0) {
    trackIndex -= 1;
  } else {
    trackIndex = trackList.length;
    console.log(trackIndex);
  }
  loadTrack(trackIndex);
  playTrack();
  console.log("previous");
}
function seekTo() {
  let seekto = curentTrack.duration * (seekSlider.value / 100);

  curentTrack.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curentTrack.duration)) {
    seekPosition = curentTrack.currentTime * (100 / curentTrack.duration);
    seekSlider.value = seekPosition;
  }
  let currentMinute = Math.floor(curentTrack.currentTime / 60);
  let currentSecond = Math.floor(curentTrack.currentTime - currentMinute * 60);
  let durationMinute = Math.floor(curentTrack.duration / 60);
  let durationSecond = Math.floor(curentTrack.duration - durationMinute * 60);

  if (currentSecond < 10) {
    currentSecond = "0" + currentSecond;
  }
  if (durationSecond < 10) {
    durationSecond = "0" + durationSecond;
  }
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }
  if (durationMinute < 10) {
    durationMinute = "0" + durationMinute;
  }

  currentTimer.textContent = currentMinute + ":" + currentSecond;
  totallDuration.textContent = durationMinute + ":" + durationSecond;
}

loadTrack(trackIndex);
