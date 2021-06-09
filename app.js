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

function loadTrack(index) {
  // clear pre seek timer
  clearInterval(updateTimer);
  resetValues();

  // load new track
  curentTrack.src = trackList[index].path;
  console.log("trackList[index].path");
  curentTrack.load();

  // update new detail
  trackName.textContent = trackList[index].name;
  artist.textContent = trackList[index].artist;

  nowPlaying.textContent =
    "Now Playing : " + (index + 1) + " Of " + trackList.length;

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

//0--------- listing all the tracks

let trackDiv = document.getElementById("trackDiv");
let ulList = document.createElement("ul");
trackDiv.appendChild(ulList);
ulList.className = "ulList";

// listing fev tracks
let favList = document.getElementById("favList");
let FavUlList = document.createElement("ul");
favList.appendChild(FavUlList);
FavUlList.className = "favUlList";

let i;
function showList() {
  for (i = 0; i < trackList.length; i++) {
    ulList.insertAdjacentHTML(
      "afterbegin",
      ` <li class="liList"> <span> ${trackList[i].name}</span> from:  <p>${trackList[i].artist}  </p>
      <button type="button" class="btn btn-outline-primary btn-sm addToFav" onclick="addToFav(this.id)" id=${trackList[i].id}>+</button>
      <button type="button" class="btn btn-outline-success btn-sm playMe" onclick="playMe(${trackList[i].id})">&#9658;</button>
      </li> `
    );
  }
}
showList();

let favTrack = [];

function addToFav(liId) {
  for (i = 0; i < trackList.length; i++) {
    if (trackList[i].id == liId) {
      let isInFav = favTrack.includes(trackList[i]);
      if (isInFav === false) {
        favTrack.push(trackList[i]);
        renderFavSong();
      }
    }
  }
  setToLocalStorage(favTrack);
}

function setToLocalStorage(track) {
  localStorage.setItem("favTrack", JSON.stringify(track));
}

// onload
loadFavsong();

function loadFavsong() {
  if (localStorage.getItem("favTrack") !== null) {
    fromLocalStorageTo();
    renderFavSong();
  }
}

function fromLocalStorageTo() {
  favTrack = JSON.parse(localStorage.getItem("favTrack"));
  return favTrack;
}

function renderFavSong() {
  FavUlList.innerHTML = "";
  for (i = 0; i < favTrack.length; i++) {
    FavUlList.insertAdjacentHTML(
      "afterbegin",
      ` <li class="liList" name="favouritList" > <span> ${favTrack[i].name}</span> from:  <p>${favTrack[i].artist}  </p>
        <button type="button" class="btn btn-outline-danger btn-sm removeFrpmFev" onclick="removeFromFav(this.id)" id=${favTrack[i].id}>-</button>
        <button type="button" class="btn btn-outline-success btn-sm playMe" onclick="playMe(${favTrack[i].id})">&#9658;</button>
        </li> `
    );
  }
}

function playMe(id) {
  loadTrack(id - 1);
}

let favouritList = document.getElementsByName("favouritList");
function removeFromFav(id) {
  for (i = 0; i < favTrack.length; i++) {
    if (favTrack[i].id == id) {
      let removeIndex = favTrack.indexOf(favTrack[i]);
      favTrack.splice(removeIndex, 1);
      setToLocalStorage(favTrack);
      renderFavSong();
    }
  }
}
