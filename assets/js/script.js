let previous = document.querySelector("#pre");
let play = document.querySelector("#play");
let next = document.querySelector("#next");
let title = document.querySelector("#title");
let recentVolume = document.querySelector("#volume");
let volumeShow = document.querySelector("#volume_show");
let slider = document.querySelector("#duration");
let show_duration = document.querySelector("#show_duration");
let track_image = document.querySelector("#track_image");
let auto_play = document.querySelector("#auto");
let present = document.querySelector("#present");
let total = document.querySelector("#total");
let artist = document.querySelector("#artist");
let time = document.querySelector("#time");

let timer;
let autoPlay = false;
let index_no = 0;
let playing_song = false;
let track = document.createElement("audio");

let All_song = [
  {
    name: "Darkside",
    path: "./assets/archive/Alan_Walker_-_Darkside__feat._Au_Ra_and_Tomine_Harket_(128k).mp3",
    img: "./assets/img/S (1).gif",
    singer: "Alan_Walker",
  },
  {
    name: "Different_World",
    path: "./assets/archive/Alan_Walker_-_Different_World_feat._Sofia_Carson,_K-391_&_CORSAK_(Vertical_V.mp3",
    img: "./assets/img/S (1).jpg",
    singer: "Alan_Walker",
  },
  {
    name: "Alone",
    path: "./assets/archive/Alan_Walker_&_Ava_Max_-_Alone,_Pt._II(128k).mp3",
    img: "./assets/img/S (17).jpg",
    singer: "Alan_Walker",
  },
  {
    name: "Lily",
    path: "./assets/archive/Alan_Walker,_K-391_&_Emelie_Hollow_-_Lily_(Lyrics)(128k).mp3",
    img: "./assets/img/S (18).jpg",
    singer: "Alan_Walker",
  },
];

function load_track(index_no) {
  track.src = All_song[index_no].path;
  title.innerHTML = All_song[index_no].name;
  track_image.src = All_song[index_no].img;
  artist.innerHTML = All_song[index_no].singer;
  track.load();

  total.innerHTML = All_song.length;
  present.innerHTML = index_no + 1;

  track.addEventListener("ended", nextSong);
  if (autoPlay) playsong();
}

load_track(index_no);

auto_play.addEventListener("click", function () {
  autoPlay = !autoPlay;
  auto_play.classList.toggle("active", autoPlay);
  if (!autoPlay) {
    pausesong();
  }
});

function justPlay() {
  if (playing_song) {
    pausesong();
  } else {
    playsong();
  }
}

function playsong() {
  track.play();
  playing_song = true;
  play.innerHTML =
    '<img src="./assets/icon/pause_48px.png" alt="ícon de pausa"/>';
}

function pausesong() {
  track.pause();
  playing_song = false;
  play.innerHTML =
    '<img src="./assets/icon/play_48px.png" alt="ícon de play"/>';
}

function nextSong() {
  if (index_no < All_song.length - 1) {
    index_no++; // Avança para a próxima música
  } else {
    index_no = 0; // Se for a última música, volta para a primeira
  }
  load_track(index_no);
  track.play(); // Garante que a nova música seja reproduzida corretamente
  playing_song = true; // Atualiza o estado da reprodução
  play.innerHTML =
    '<img src="./assets/icon/pause_48px.png" alt="ícon de pausa"/>'; // Atualiza o botão para "pausa"
}

function previousSong() {
  if (index_no > 0) {
    index_no--; // Volta para a música anterior
  } else {
    index_no = All_song.length - 1; // Se for a primeira música, volta para a última
  }
  load_track(index_no);
  track.play(); // Garante que a nova música seja reproduzida corretamente
  playing_song = true; // Atualiza o estado da reprodução
  play.innerHTML =
    '<img src="./assets/icon/pause_48px.png" alt="ícon de pausa"/>'; // Atualiza o botão para "pausa"
}


next.addEventListener("click", function () {
  nextSong();
});

previous.addEventListener("click", function () {
  previousSong();
});

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    justPlay();
  } else if (event.code === "Enter") {
    nextSong();
  } else if (event.code === "Tab") {
    event.preventDefault();
    previousSong();
  }
});

function rangeSlider() {
  if (!isNaN(track.duration)) {
    let position = track.currentTime * (100 / track.duration);
    slider.value = position;
    updateTimeDisplay(track.currentTime);
  }
}

timer = setInterval(rangeSlider, 1000);

function updateTimeDisplay(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  time.innerHTML = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function changeDuration() {
  let slider_position = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
  updateTimeDisplay(slider_position);
}

slider.addEventListener("input", changeDuration);

function volumeChange(increase = true) {
  let newVolume = increase
    ? parseInt(recentVolume.value) + 2
    : parseInt(recentVolume.value) - 2;
  newVolume = Math.min(Math.max(newVolume, 0), 100);
  recentVolume.value = newVolume;
  volumeShow.innerHTML = newVolume;
  track.volume = newVolume / 100;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") {
    event.preventDefault();
    volumeChange(true);
  } else if (event.code === "ArrowLeft") {
    event.preventDefault();
    volumeChange(false);
  }
});
