
const DELAY = 1000;
const refs = {
    start: document.querySelector("[data-start]"),
    stop: document.querySelector("[data-stop]"),
    body: document.body
}

refs.stop.disabled = true;

const start = document.querySelector("[data-start]");

let interval = null;


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener('click', onStart);

function onStart() {
    refs.start.disabled = true;
    refs.stop.disabled = false;
    interval = setInterval(() => {
       refs.body.style.backgroundColor = getRandomHexColor(); 
    }, DELAY);    
}

refs.stop.addEventListener('click', onStop);

function onStop() {
    refs.start.disabled = false;
    refs.stop.disabled = true;
    clearInterval(interval);
} 