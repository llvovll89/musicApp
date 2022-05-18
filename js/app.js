// const 변수에 , 붙이면 const 생략하고 연달아 사용가능
const wrap = document.querySelector('.wrap'),
Img = wrap.querySelector('.img-area img'),
Name = wrap.querySelector('.song-details .name'),
artist = wrap.querySelector('.song-details .artist');

let musicIndex = 2;

window.addEventListener('load', () => {
    loadMusic(musicIndex);
})

function loadMusic() {

}


