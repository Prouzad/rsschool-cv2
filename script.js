var swiper = new Swiper(".swiper-container", {
  direction: "vertical",
  sliderPerView: 1,
  spaceBetween: 0,
  mousewheel: true,
  pagination: {
    el: ".swiper-pagination",
    type: "progressbar",
  },
});

// Audio player

const player = document.querySelector('.player');
const audio = document.querySelector('.audio');
const artName = document.querySelector('.name-song');
const songName = document.querySelector('.song');
const imgPlayer = document.querySelector('.imgPlayer');
const playSong = document.querySelector('.play');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');
const timeProgressBox = document.querySelector('.time-box');
const timeProgress = document.querySelector('.time');
const cTime = document.querySelector('.currentTime');
const dTime = document.querySelector('.durationTime');


// Name songs
const songArr = [`Don't Hurt Yourself`, `Don't Start Now`, `Горы По Колено`];
const artArr = ['Beyonce', 'Dua Lipa', `Макс Корж`]


//Song defoult
let songIndex = 0;



// Load song

function loadSong(song, name){
    songName.innerHTML = song;
    artName.innerHTML = name;
    audio.src = `./assets/audio/${song}.mp3`;
    imgPlayer.src = `./assets/images/${song}.png`;
}


loadSong(songArr[songIndex], artArr[songIndex]);


//Play

function playAudio(){
    player.classList.add('plays');
    imgPlayer.classList.add('plays');
    playSong.src = './assets/svg/pause.png';
    audio.play();

}

// Pause
function pauseAudio(){
    player.classList.remove('plays');
    imgPlayer.classList.remove('plays');
    playSong.src = './assets/svg/play.png';
    audio.pause();
}

playSong.addEventListener('click', () => {
    const isPlaying = player.classList.contains('plays')

    if(isPlaying){
        pauseAudio()
        
    }else{
        playAudio();
    }
})

// Next song

function forwardsong(){
    songIndex++;
    if(songIndex > songArr.length -1){
        songIndex = 0
    }

    loadSong(songArr[songIndex], artArr[songIndex]);
    playAudio()

}

forward.addEventListener('click', forwardsong);


// backward 

function backwardSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songArr.length -1;
    }

    loadSong(songArr[songIndex], artArr[songIndex]);
    pauseAudio()
}

backward.addEventListener('click', backwardSong);


//Time line

function timeLine(e){
    const {duration, currentTime} = e.srcElement;
    const progressLine = (currentTime / duration) * 100;
    timeProgress.style.width = `${progressLine}%`;
   
   
}

audio.addEventListener('timeupdate', timeLine);

//click time

function setTime(e){
    const width = this.clientWidth;
    const clickC = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickC /width) * duration;
}

timeProgressBox.addEventListener('click', setTime)

//Auto play
audio.addEventListener('ended', forwardsong);

//CurrentTime
audio.addEventListener('timeupdate', function () {
    cTime.innerHTML = secondsToTime(audio.currentTime);
})

//Duration time

audio.addEventListener('loadeddata', function () {
    

    dTime.innerHTML = secondsToTime(audio.duration)
})



function secondsToTime(time){
             
    let h = Math.floor(time / (60 * 60)),
        dm = time % (60 * 60),
        m = Math.floor(dm / 60),
        ds = dm % 60,
        s = Math.ceil(ds);
    if (s === 60) {
        s = 0;
        m = m + 1;
    }
    if (s < 10) {
        s = '0' + s;
    }
    if (m === 60) {
        m = 0;
        h = h + 1;
    }
    if (m < 10) {
        m = '0' + m;
    }
    if (h === 0) {
        fulltime = m + ':' + s;
    } else {
        fulltime = h + ':' + m + ':' + s;
    }
    return fulltime;
}



// // image task

const search = document.querySelector(".search");
let url =
  "https://api.unsplash.com/search/photos?query=gamer&per_page=4&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";
let dat = [];
let mainBox = document.querySelector('.main-box')
const imgBoxs = document.querySelectorAll(".img-box");
const modalContent = document.querySelector(".modal");



search.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let images = search.value;
    const link = "https://api.unsplash.com/search/photos?query=";
    const key = "&per_page=4&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo";

    url = link + images + key;
    
    getData(url);
  }
});

async function getData(link) {
  const res = await fetch(link);
  const data = await res.json();
  let images = data.results;

 
      
      creatImg(images)

}
getData(url);



const creatImg = (images) => {
  let src = [];
  mainBox.innerHTML = ''
  let arr = images.map((w) => {
    const block = document.createElement('div');
    block.classList.add('img-box');
    mainBox.append(block)
  
    src.push(w.urls.small);
    let img = document.createElement('img');
    img.classList.add('img');
    img.src = `${w.urls.small}`;
    img.alt = `image`;
    block.append(img);
   return src;
      
   

  })

  


}






// Memory Game

const cards = document.querySelectorAll(".memory-card");
const startWindow = document.querySelector(".start-box");
const startContent = document.querySelector(".start");
const enterBtn = document.querySelector('.button')
const resetBtn = document.querySelector('.reset')
const input = document.querySelector('input')

let oldGames, oldUser;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;
let openCards = 9;
let userPName = '';



// resetBtn.addEventListener('click', reaolader)

// function reaolader(){
//   // console.log(userPName)
  
   
    
//   window.location.reload();
    
    

// }


// START GAME

// User.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     startUser()
//   }
// });

// enterBtn.addEventListener('click', startUser);

// function startUser(){
//   // let userName = input.value.trim();
//   userPName = input.value.trim();
//   // console.log(userPName)
//   if(userPName !== '' && !userPName.includes(' ')){
//     startWindow.classList.remove("active");
//     startContent.classList.remove("content-active");
  
  
//     setTimeout(() => {
//       cards.forEach((card) => card.classList.add('flip'));
//       setTimeout(() => {
//         cards.forEach((card) => card.classList.remove('flip'));
//       }, 1700)
    
    
      
      
//      }, 500);
//   }else {
   
//     input.placeholder = "Type name here..";
   
//   }
// }
// Oen Card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  counter++;
  // console.log(counter)
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  hasFlippedCard = false;

  checkForMatch();
}


// if(localStorage.getItem('game') == null){
//   localStorage.setItem('game','[]');
// }



// if(localStorage.getItem('user') == null){
//   localStorage.setItem('user','[]');
// }




//Check dataset cards

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
  if(isMatch){
    // console.log(firstCard)
    openCards++
    disableCards();
    for(let i = 0; i < 1; i++){
    
      if(openCards == 4){
        debugger
     


      }
    }
   
  }else{
    unflipCards();
  } 

  function storage(){

  }

  // if(isMatch){
    

  //   openCards.forEach(cards => {
  //     if(cards == 12){

  //       console.log(openCards)
  //     }else{
  //       console.log('lox')
  //     }
  //   })
 
  // }
  
}
//remove click Card
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}


// Close Card
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;
    resetBoard();
  }, 1500);
}

//reset Board

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//random cards

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  })
})();

//Primary show





cards.forEach((card) => card.addEventListener("click", flipCard));
