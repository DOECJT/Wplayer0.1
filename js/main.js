let url = 'src/music.json';
let staticMusicList = [];
let activeMusicList = [];
let audioPlayer = document.querySelector('audio');
let musicIndex = 0;

getMusic(url).then((response) => {
    staticMusicList = JSON.parse(response);
    musicElement(staticMusicList);
    return staticMusicList;
}).then((staticMusicList) => {
    let allMusic = document.querySelectorAll('.music');
    allMusic.forEach((item, index) => {
        item.addEventListener('click', () => {
            addMusic(activeMusicList, staticMusicList[index]);
            playMusic(activeMusicList, musicIndex);
            audioPlayer.addEventListener('ended', () => {
                musicIndex = musicIndex + 1;
                console.log(musicIndex);
                playMusic(activeMusicList, musicIndex);
            });
        });
    });
});

// get music source
function getMusic(url){
    return new Promise((resolve, reject) => {
        let XHR = new XMLHttpRequest();
        XHR.open('get', url, true);
        XHR.send();
        XHR.onreadystatechange = () => {
            if(XHR.readyState == 4){
                if(XHR.status == 200){
                    resolve(XHR.responseText);
                }
                else{
                    reject();
                }
            }
        };
    });
}

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

// play list
// audioPlayer.addEventListener('end', () => {
//     musicIndex++;
//     playMusic(musicList, musicIndex);
// });
function playMusic(musicList, musicIndex){
    audioPlayer.src = musicList[musicIndex].url;
}

// let musicSwitch = document.querySelector('#music-switch');
// let musicStatus = false;
// musicSwitch.onclick = playOrPause;
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
        target.unshift(source);
    }
}