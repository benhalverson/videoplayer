/* eslint no-return-assign: ["off"] */
/* eslint-env browser */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const bigscreen = player.querySelector('.fullscreen');
const ranges = player.querySelectorAll('.player__slider');
let mousedown = false;

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
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

function fullscreen() {
  if (video.fullscreenElement !== null) {
    video.webkitRequestFullscreen();
  }
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('pause', updateButton);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
skipButtons.forEach(button => button.addEventListener('click', skip));
bigscreen.addEventListener('click', fullscreen);
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
