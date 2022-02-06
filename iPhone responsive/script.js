setInterval(setDigitalClock, 1000);

const circleButton = document.getElementById('circleButton');
const buttonPower = document.getElementById('buttonPower');
const iScreen = document.getElementById('iScreen')
const taskbarTime = document.getElementById('taskbarTime')
const screenUnlocked = document.getElementById('screenUnlocked')
const batteryBar = document.getElementById('battery_bar')
const battery = document.getElementById('battery')
const leftTogglepage = document.getElementById('leftTogglepage')
const rightTogglepage = document.getElementById('rightTogglepage')
const apps = document.getElementById('apps')
const wifi = document.getElementById('wifi')
const airplaneMode = document.getElementById('airplane-mode')

const switchOnScreen=()=>{
    const passCodeScreen = document.getElementById('passCodeScreen')
    const iPhone = document.getElementById('iPhone')
    passCodeScreen.style.display = 'flex'
    iPhone.style.boxShadow = '50px 50px 50px rgba(  0, 0, 0, 0.601)'

    

    if (batteryBar.style.width === '0%') {
        screenUnlocked.style.display = 'none'   
        console.log('working');
       }
}
const switchOffScreen = () => {
    const passCodeScreen = document.getElementById('passCodeScreen')
    passCodeScreen.style.display = 'none'
    const iPhone = document.getElementById('iPhone')
    iPhone.style.boxShadow = '50px 50px 50px rgba(0, 0, 0, 0.801)'

    // screenUnlocked.style.display='none'
}
const switchOffHomeScreen = () => {
    screenUnlocked.style.display = 'none'   
 }


// const reduceWidth = (e)=> {
//     if (e.etyle.width = "0%") {
//        console.log('battery low');
//    }
// };
// setTimeout(reduceWidth, 10000)

//-------------- setting the battery percentage to device--------------;

navigator.getBattery().then(function (battery) {
    const level = battery.level;
    const status =Math.round(`${level * 100 }`)+ "%" ;

    batteryBar.style.width = status;
    if (batteryBar.style.width <= '30%' && batteryBar.style.width <= '10%') {
        batteryBar.style.backgroundColor = 'yellow';
    }
    else if (batteryBar.style.width <= '10%' && switchOnScreen) {
        switchOffHomeScreen()
        batteryBar.style.backgroundColor = 'red';

        
        // Displays A card That says battery running low pls plug in
        //     const cardContent=`   <div class="card">
        //     Pls plug your phone
        // </div>`
        //     screenUnlocked.insertAdjacentHTML('beforeend',cardContent)
    }
    else if (batteryBar.style.width == '100%') {
        batteryBar.style.backgroundColor = ' rgb(49, 250, 49)';
     }
    console.log(status);
})


// counter
let counter = 1;
const size = 86

rightTogglepage.addEventListener('click', (e) => {
    if (counter >=3 ) return;
    counter++
    apps.style.transform = 'translateX(' + (-size * (counter)) + 'px)'
    // e.classList.add('active')
})

leftTogglepage.addEventListener('click', () => {
    if (counter <=0 ) return;
    counter--
    apps.style.transform = 'translateX(' + (-size * (counter)) + 'px)'
})
const moveScreenLeft=() => {
  
}

//------------------ Drag to move The Screen Horizontally----------------

let initialPosition = null;
let moving = false;
let transform = null;

const gestureStart = (e) => {
    initialPosition = e.pageX;
    moving = true;
    const transformMatrix = this.getComputedStyle(apps).getPropertyValue('transform');
    if (transformMatrix != 'none') {
        transform = parseInt(transformMatrix.split(',')[ 4 ].trim())  
    }
}
const gestureMove = (e) => {
    if (moving) {
        const currentPosition = e.pageX;
        const diff = currentPosition - initialPosition;
        apps.style.transform = `translateX(${transform + diff}px)`
        
    }
}
const gestureEnd =(e) => { 
    moving = false;
}
if (window.PointerEvent) {
    screenUnlocked.addEventListener('pointerdown', gestureStart)

    screenUnlocked.addEventListener('pointermove', gestureMove)

    screenUnlocked.addEventListener('pointerup', gestureEnd)
} else {
    
    screenUnlocked.addEventListener('mousedown', gestureStart)

    screenUnlocked.addEventListener('mousemove', gestureMove)

    screenUnlocked.addEventListener('mouseup', gestureEnd)
}

//------------------ Drag to move The Screen Vertically----------------
// let initialVerticalPosition = null;
// let movingVertical = false;
// let transformVertical = null;
// const gestureStartVertical = (e) => {
//     initialPosition = e.pageY;
//     moving = true;
//     const transformMatrix = this.getComputedStyle(apps).getPropertyValue('transform');
//     if (transformMatrix != 'none') {
//         transform = parseInt(transformMatrix.split(',')[ 4 ].trim())  
//     }
// }


let key = document.querySelectorAll('.keys')
const okButton = document.getElementById('ok')


const validatePin = function () { 
    let input = '',
        correct = '1234';
    
    numbers = Array.from(key)
    const numbersBox = document.getElementsByClassName('container')[ 0 ]
    
    numbersBox.addEventListener('click',  function (e) {
        const number = e.target.innerText;
        input += number;
        
        if (input.length>=4) {
            if (input !== correct) {
                screenUnlocked.style.display='none'
            } else {
                screenUnlocked.style.display = 'flex'
                switchOffScreen()
                
            }
        }
    })
}

validatePin()


  


// create a function that checks if the keys isequal to pin

// Listen to the keys and return a particular number
const appendNumber = function (number) {
   return number = number.toString()
}

// once ok is clicked it check if the input is equal to the pin 

okButton.addEventListener('click', () => {
 
    
})

circleButton.addEventListener('click', () => {
    switchOnScreen();
   
    return
    switchOffScreen()
})
buttonPower.addEventListener('click', () => {
    switchOffScreen()
    switchOffHomeScreen()
})



function setDigitalClock() {
    let time = new Date();
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()
    amToPm = "AM";
    if (hours > 12){
        hours -= 12
        amToPm="PM"
    }
    if(hours == 0){
        hours = 12
        amToPm="PM"
    }

    if (hours < 10) {
        hours =`${hours}`
    }
    if (minutes < 10) {
        minutes =`0${minutes}`
    }
    if (seconds < 10) {
        seconds =`0${seconds}`
    }
    taskbarTime.innerText = `${hours}:${minutes}`
  
}

setDigitalClock();

//----------------- Wifi settings ------------------ 
window.addEventListener('online', updateStatus)
window.addEventListener('offline', updateStatus)

function updateStatus() {
    if (navigator.onLine) {
        wifi.style.opacity = '1'   
        airplaneMode.style.opacity='0' 
    }
    else {
        wifi.style.opacity = '0' 
        airplaneMode.style.opacity='1' 
    }
};
updateStatus()


// const deviceOnline = navigator.onLine
// if (!deviceOnline) {
//  wifi.style.opacity='0'   
// }

//---------------MusicPlayer-------------
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song Titles
const songs = [ 'Humble', 'King Kunta', 'Element' ];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `music-img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {

  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

