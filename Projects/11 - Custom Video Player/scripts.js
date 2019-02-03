// get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreenElement = player.querySelector('.make_fs');
const bodyElement = document.querySelector('body');

// build functions
function togglePlay() {

  const method = video.paused ? 'play' : 'pause';
  video[method]();

  // video[video.paused ? 'play' : 'pause']();
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullScreen() {
  console.log(this)
  if (!fullScreen) {
    bodyElement.style.background = 'linear-gradient(135deg, #000 0%,#000 48%,#000 100%)';
    player.style.maxWidth = '100%';
    player.style.width = '100%';
  } else {
    bodyElement.style.background = 'linear-gradient(135deg, #7c1599 0%,#921099 48%,#7e4ae8 100%)';
    player.style.maxWidth = '750px';
    player.style.width = 'auto';
  }
  fullScreen = !fullScreen;
}

// hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
 
 let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
 
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

let fullScreen = false;
fullScreenElement.addEventListener('click', handleFullScreen);