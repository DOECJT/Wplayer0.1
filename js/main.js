// get music source
let musicList;
let xhr = new XMLHttpRequest();
xhr.open('get', 'src/music.json', true);
xhr.send();
xhr.onload = function(){
    musicList = JSON.parse(this.responseText);
    musicElement(musicList);
    let allMusic = document.querySelectorAll('.music');
    allMusic.forEach((music, index) => {
        music.onclick = () => {
            playMusic(musicList, index);
        };
    });
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
}