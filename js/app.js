// const 변수에 , 붙이면 const 생략하고 연달아 사용가능
const wrap = document.querySelector(".wrap"),
  Img = wrap.querySelector(".img-area img"),
  Name = wrap.querySelector(".song-details .name"),
  Artist = wrap.querySelector(".song-details .artist"),
  Music = wrap.querySelector("#main-audio"),
  pauseBtn = wrap.querySelector(".play-pause"),
  prevBtn = wrap.querySelector("#prev"),
  nextBtn = wrap.querySelector("#next"),
  progressArea = wrap.querySelector(".progress-area"),
  progressBar = wrap.querySelector(".progress-bar"),
  musicList = wrap.querySelector(".music-list"),
  moreShowBtn = wrap.querySelector("#more-music"),
  musicHideBtn = musicList.querySelector("#close");

let musicIndex = Math.floor(Math.random() * musicAll.length + 1);

window.addEventListener("load", () => {
  loadMusic(musicIndex);
  playingNow();
});

function loadMusic(indexNumb) {
  Name.innerText = musicAll[indexNumb - 1].name;
  Artist.innerText = musicAll[indexNumb - 1].artist;
  Img.src = `img/${musicAll[indexNumb - 1].img}.jpg`;
  Music.src = `mp3/${musicAll[indexNumb - 1].src}.mp3`;
};

// play music
function playMusic() {
  wrap.classList.add("paused");
  pauseBtn.querySelector("i").innerText = "pause";
  Music.play();
};

// pause music
function pauseMusic() {
  wrap.classList.remove("paused");
  pauseBtn.querySelector("i").innerText = "play_arrow";
  Music.pause();
};

function nextMusic() {
  musicIndex++;
  musicIndex > musicAll.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
  playingNow();
};

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = musicAll.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// play btn
pauseBtn.addEventListener("click", () => {
  const musicPaused = wrap.classList.contains("paused");
  musicPaused ? pauseMusic() : playMusic();
  playingNow();
});

// next music btn E
nextBtn.addEventListener("click", () => {
  nextMusic();
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

// progress-Bar
Music.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressBarWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressBarWidth}%`;

  let musicCurrentTime = wrap.querySelector(".current"),
    musicDuration = wrap.querySelector(".duration");

  Music.addEventListener("loadeddata", () => {
    let audioDuration = Music.duration;
    let totalTime = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    // If the second is less than 10, it is expressed with a leading zero.
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalTime}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  // If the second is less than 10, it is expressed with a leading zero.
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffSetx = e.offsetX;
  let songDuration = Music.duration;

  Music.currentTime = (clickedOffSetx / progressWidth) * songDuration;
  playMusic();
});

const reapeatBtn = wrap.querySelector("#repeat-plist");
reapeatBtn.addEventListener("click", () => {
  let getText = reapeatBtn.innerText;
  switch (getText) {
    case "repeat":
      reapeatBtn.innerText = "repeat_one";
      reapeatBtn.setAttribute("title", "노래 반복");
      break;
    case "repeat_one":
      reapeatBtn.innerText = "shuffle";
      reapeatBtn.setAttribute("title", "재생 섞기");
      break;
    case "shuffle":
      reapeatBtn.innerText = "repeat";
      reapeatBtn.setAttribute("title", "재생목록 반복");
      break;
  }
});

Music.addEventListener("ended", () => {
  let getText = reapeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      Music.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * musicAll.length + 1);
      do {
        randIndex = Math.floor(Math.random() * musicAll.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      playingNow();
      break;
  }
});

moreShowBtn.addEventListener("click", () => {
  musicList.classList.toggle("show");
});

musicHideBtn.addEventListener("click", () => {
  moreShowBtn.click();
});

const ulTag = wrap.querySelector("ul");

for (let i = 0; i < musicAll.length; i++) {
  let liTag = ` <li li-index="${i + 1}">
      <div class="row">
        <span>${musicAll[i].name}</span>
            <p>${musicAll[i].artist}</p>
      </div>
      <audio class="${musicAll[i].src}" src="mp3/${
    musicAll[i].src
  }.mp3"></audio>
        <span id="${musicAll[i].src}" class="audio-duration">3:40</span>
      </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${musicAll[i].src}`);
  let liAudioTag = ulTag.querySelector(`.${musicAll[i].src}`);

  liAudioTag.addEventListener("loadeddata", () => {
    let audioDuration = liAudioTag.duration;
    let totalTime = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    // If the second is less than 10, it is expressed with a leading zero.
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalTime}:${totalSec}`;
    liAudioDuration.setAttribute('t-duration', `${totalTime}:${totalSec}`);
  });
}

const allLiTags = ulTag.querySelectorAll("li");
function playingNow(){
  for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTags[j].querySelector('.audio-duration');
    if(allLiTags[j].classList.contains('playing')){
      allLiTags[j].classList.remove('playing');
      let adDuration = audioTag.getAttribute('t-duration');
      audioTag.innerText = adDuration; 
    }
    if (allLiTags[j].getAttribute("li-index") == musicIndex) {
      allLiTags[j].classList.add("playing");
      audioTag.innerText ="Playing";
    }
    allLiTags[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();
  playingNow();
}
