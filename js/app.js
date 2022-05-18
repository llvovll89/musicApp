// const 변수에 , 붙이면 const 생략하고 연달아 사용가능
const wrap = document.querySelector(".wrap"),
  Img = wrap.querySelector(".img-area img"),
  Name = wrap.querySelector(".song-details .name"),
  Artist = wrap.querySelector(".song-details .artist"),
  Music = wrap.querySelector("#main-audio"),
  pauseBtn = wrap.querySelector(".play-pause");

let musicIndex = 3;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
  Name.innerText = musicAll[indexNumb - 1].name;
  Artist.innerText = musicAll[indexNumb - 1].artist;
  Img.src = `img/${musicAll[indexNumb - 1].img}.jpg`;
  Music.src = `mp3/${musicAll[indexNumb - 1].src}.mp3`;
}

// play music
function playMusic() {
  wrap.classList.add("paused");
  Music.play();
}

// pause music
function pauseMusic() {
    wrap.classList.remove("paused");
    Music.pause();
  }
  

// play btn
pauseBtn.addEventListener("click", () => {
  const musicPaused = wrap.classList.contains("paused");
  musicPaused ? pauseMusic() : playMusic();
});
