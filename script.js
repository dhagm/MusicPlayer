const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
// const showLib = document.getElementById('showLib');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.getElementById('currTime');
const durTime = document.getElementById('durTime');
// const library = document.getElementById('library');

// library.style.left = "-100%";

// Song titles
const songs = ['Ái Nộ', 'Alone', 'Váy cưới - Trung Tự', 'Buồn vì yêu không giữ gìn', 'Cô ta', 'Cưới Thôi', 'Điêu Toa', 'Đường Tôi Chở Em Về (Lofi)', 'Em Của Quá Khứ Phạm Nguyên Ngọc Cover', 'Muốn nói với em', 'Nhất Thân', 'QUÊN MỘT NGƯỜI TỪNG YÊU', 'Sài gòn hôm nay mưa', 'Thay lòng(Nal)', 'Thương thầm (Lofi)', 'Trên tình bạn dưới tình yêu (Cover)', 'Vô tình (Lofi)'];
const artists = [];

// Keep track of song
let songIndex = 0;

if (getCookie("songIndex") != "")
	songIndex = parseInt(getCookie("songIndex"));

if (getCookie("currentTime") != "")
	audio.currentTime = getCookie("currentTime");

// Initially load song details into DOM
loadSong(songs[songIndex]);

pauseSong();

// initLibrary();

// var songCreated = 0;
// function initLibrary(){
	// for (var i = 0; i < songs.length; i++){
		// var song = songs[i];
		// var musicCover = document.createElement('img');
		// musicCover.src = `images/${song}.jpg`;
		// musicCover.alt = 'Music cover';
		// var librarySongInfo = document.createElement('div');
		// librarySongInfo.classList.add('library-song-info');
		// var h3M = document.createElement('h3');
		// h3M.innerHTML = song;
		// var h4M = document.createElement('h4');
		// h4M.innerHTML = artists[i];
		// var librarySong = document.createElement('div');
		// librarySong.classList.add('library-song');
		// librarySong.id = i;
		// songCreated = i;
		// console.log(songCreated);

		// librarySongInfo.appendChild(h3M);
		// librarySongInfo.appendChild(h4M);
		// librarySong.appendChild(musicCover);
		// librarySong.appendChild(librarySongInfo);

		// librarySong.addEventListener('click', ()=>{
			// loadSong(songs[songIndex]);
		// });

		// library.appendChild(librarySong);
	// }
// }
// console.log(songCreated);

// Update song details
function loadSong(song) {
  document.cookie = "songIndex=" + songIndex + ";" + "currentTime=0";
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  document.getElementById('aDownloadMusic').href = `music/${song}.mp3`;
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
  document.cookie = "songIndex=" + songIndex + ";" + "currentTime=" + audio.currentTime;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
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
// showLib.addEventListener('click', function(){
	// if (library.style.left == "0px") {
		// library.style.left = "-100%";
	// } else {
		// library.style.left = "0px";
	// }
// })

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);

