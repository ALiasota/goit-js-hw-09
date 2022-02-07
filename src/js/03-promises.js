import { Notify } from 'notiflix/build/notiflix-notify-aio';


const form = document.querySelector('.form');







function onSubm(e) {
  e.preventDefault();
  const delay = form.elements.delay.value;  
  const step = form.elements.step.value;
  const amount = form.elements.amount.value;
  const promises = [];
  

  if (amount <= 0) {
    Notify.info("Enter plus amount");
    return;
  }
  
  // promises.push({ position: 0, step: delay });

  createPromise(0, delay).then(({ position, delay }) => {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  
  for (let i = 1; i <= amount; i += 1) {    
     createPromise(i, step).then(({ position, delay }) => {
    Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.info(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }

}



form.addEventListener('submit', onSubm);


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay >= 0) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay); 
  })
}

