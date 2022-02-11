import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form');







function onSubm(e) {
  e.preventDefault();
  const startDelay = Number(form.elements.delay.value);  
  const step = Number(form.elements.step.value);  
  const amount = Number(form.elements.amount.value);
  let delay = startDelay;
  
  

  if (amount <= 0) {
    Notify.info("Enter plus amount");
    return;
  }
  
  

  
  
  for (let i = 1; i <= amount; i += 1) {       
    createPromise(i, delay)
      .then(({ position, delay }) => {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step;    
  }

}



form.addEventListener('submit', onSubm);


function createPromise(position, delay) {
  const canFulfill = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
   setTimeout(() => {
      if (canFulfill) {
        resolve({position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}