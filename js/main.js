// get music source
let staticMusicList = [];
let activeMusicList = [];
let xhr = new XMLHttpRequest();
xhr.open('get', 'src/music.json', true);
xhr.send();
xhr.onload = function(){
    staticMusicList = JSON.parse(this.responseText);
    musicElement(staticMusicList);
    let allMusic = document.querySelectorAll('.music');
    allMusic.forEach((music, index) => {
        music.onclick = () => {
            playMusic(staticMusicList, index);
            musicStatus = true;
            checkMusicStatus();
        };
    });
    let playAll = document.querySelector('.play-music-list');
    playAll.onclick = () => {
        addMusic(activeMusicList, staticMusicList);
        playActiveList(activeMusicList);
    };
};

// create music element
function musicElement(list){
    let musicHtml = '';
    list.forEach(element => {
        musicHtml += `
        <div class="music">
            <img src="${element.image}" alt="">
            <div class="info">
                <div class="music-title">${element.title}</div>
                <div class="music-singer">${element.singer}</div>
            </div>
        </div>
        `;
    });
    let musicList = document.querySelector('.musicList');
    musicList.innerHTML = musicHtml;
}

// play music
function playMusic(array, i){
    let activeMusic = document.querySelector('.active-music audio');
    activeMusic.src = array[i].url;
    let activeImg = document.querySelector('.active-music img');
    activeImg.src = array[i].image;
    let activeTitle = document.querySelector('.active-info .active-title');
    let activeSinger = document.querySelector('.active-info .active-singer');
    activeTitle.innerHTML = array[i].title;
    activeSinger.innerHTML = array[i].singer;
}

// play or pause music
let audioPlayer = document.querySelector('.active-music audio');
let musicSwitch = document.querySelector('#music-switch');
let musicStatus = false;
musicSwitch.onclick = playOrPause;
function playOrPause(){
    musicStatus = !musicStatus;
    checkMusicStatus();
}
function checkMusicStatus(){
    if(musicStatus){
        musicSwitch.children[0].className = 'fa fa-pause-circle-o';
        audioPlayer.play();
    }
    else{
        musicSwitch.children[0].className = 'fa fa-play-circle-o';
        audioPlayer.pause();
    }
}

// play in order automatically
function playNext(){
    
}
function playActiveList(activeList){
    audioPlayer.src = activeList[0].url;
    audioPlayer.addEventListener('pause');
}

// add music to active list
function addMusic(target, source){
    if(Array.isArray(source)){
        //清空数组
        target.length = 0;
        source.forEach((item) => {
            target.push(item);
        });
    }
    else{
        target.push(source);
    }
}