import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

getSavedTame();

const onPlay = function (data) {  
    localStorage.setItem(STORAGE_KEY, data.seconds);  
};

player.on('timeupdate', throttle(onPlay, 1000));

function getSavedTame() {
  const savedTime = localStorage.getItem(STORAGE_KEY);
  if (savedTime) {
    player.setCurrentTime(Number(savedTime));
  }
}
